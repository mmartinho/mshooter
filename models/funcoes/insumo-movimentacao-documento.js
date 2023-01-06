const db = require('../../models');
const InsumoMovimentacao = require('./insumo-movimentacao');
const MovimentacaoNotFoundError = require('../../shared/errors/movimentacao-not-found');

class InsumoMovimentacaoDocumento {

    /**
     * @param integer esportista_id
     * @param integer insumomovimentacao_id 
     * @param integer documento_id
     * @throws MovimentacaoNotFoundError 
     * @returns InsumoMovimentacaoDocumento | null
     */
    static async busca(esportista_id, insumomovimentacao_id, documento_id) {
        const insumoMovimentacao = await InsumoMovimentacao.encontrar(esportista_id, insumomovimentacao_id);
        const criteria = {
            where: { 
                insumomovimentacao_id: Number(insumomovimentacao_id), 
                documento_id: Number(documento_id) 
            }
        }
        if(!insumoMovimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação de Insumo ID ${insumomovimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }  
        const one = await db.InsumoMovimentacaoDocumento.findOne(criteria);
        return one;    
    }

    /**
     * @param integer esportista_id
     * @param integer insumomovimentacao_id 
     * @param integer documento_id
     * @throws MovimentacaoNotFoundError 
     * @returns InsumoMovimentacaoDocumento | null
     */    
    static async mostra(esportista_id, insumomovimentacao_id, documento_id) {
        const insumoMovimentacao = await InsumoMovimentacao.encontrar(esportista_id, insumomovimentacao_id);
        const criteria = {
            where: { 
                insumomovimentacao_id: Number(insumomovimentacao_id), 
                documento_id: Number(documento_id) 
            },
            include: ['InsumoMovimentacao','documentoSemConteudo']
        }
        if(!insumoMovimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação de Insumo ID ${insumomovimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }  
        const one = await db.InsumoMovimentacaoDocumento.findOne(criteria);
        return one;    
    }    

    /**
     * @param integer esportista_id
     * @param integer insumomovimentacao_id
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @throws MovimentacaoNotFoundError
     * @returns {*}
     */
     static async lista(esportista_id, insumomovimentacao_id, limit=null, offset=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: { insumomovimentacao_id: Number(insumomovimentacao_id) }, 
            include: ['InsumoMovimentacao','documentoSemConteudo'] 
        } 
        const insumoMovimentacao = await InsumoMovimentacao.encontrar(esportista_id, insumomovimentacao_id);
        if(!insumoMovimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação de Insumo ID ${insumomovimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }              
        if(limit === null || offset === null) {
            all = await db.InsumoMovimentacaoDocumento.findAll(criteria);
            return all;            
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset)
            await db.InsumoMovimentacaoDocumento.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'InsumoMovimentacaoDocumento', total, rows : all};            
        }            
    }    

    /**
     * @param integer esportista_id
     * @param integer insumomovimentacao_id 
     * @param integer documento_id 
     * @throws MovimentacaoNotFoundError
     * @returns boolean
     */
    static async existe(esportista_id, insumomovimentacao_id, documento_id) {
        const insumoMovimentacao = await InsumoMovimentacao.encontrar(esportista_id, insumomovimentacao_id);
        if(!insumoMovimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação de Insumo ID ${insumomovimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }          
        const existe = await InsumoMovimentacaoDocumento.busca(esportista_id, insumomovimentacao_id, documento_id);
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * @param integer esportista_id 
     * @param integer insumomovimentacao_id 
     * @param integer documento_id 
     * @throws Error | MovimentacaoNotFoundError
     * @returns InsumoMovimentacaoDocumento | null
     */
    static async criar(esportista_id, insumomovimentacao_id, documento_id) {
        const insumoMovimentacao = await InsumoMovimentacao.encontrar(esportista_id, insumomovimentacao_id);
        if(!insumoMovimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação de Insumo ID ${insumomovimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }        
        var InsumoMovimentacaoDocumentoCreated = null;
        await db.InsumoMovimentacaoDocumento.create({
            insumomovimentacao_id: Number(insumomovimentacao_id), 
            documento_id: Number(documento_id)
        }).then(InsumoMovimentacaoDocumento => {
                InsumoMovimentacaoDocumentoCreated = InsumoMovimentacaoDocumento;
            }).catch(error => {
                throw new Error(
                    `Não possível criar Documento de movimentação de insumo ID ${insumomovimentacao_id} `+
                    `${error.message}`
                );
            });
        return InsumoMovimentacaoDocumentoCreated;
    }    

    /**
     * @param integer esportista_id
     * @param integer insumomovimentacao_id 
     * @param integer documento_id
     * @returns boolean
     */
    static async exclui(esportista_id, insumomovimentacao_id, documento_id) {
        var excluiu = false;
        const insumoMovimentacao = await InsumoMovimentacao.encontrar(esportista_id, insumomovimentacao_id);
        if(insumoMovimentacao) {
            const criteria = {
                where: { 
                    insumomovimentacao_id: insumoMovimentacao.id, 
                    documento_id: Number(documento_id) 
                }
            }
            const insumoMovimentacaoDocumento = await db.InsumoMovimentacaoDocumento.findOne(criteria);
            if(insumoMovimentacaoDocumento) {
                await db.Documento.destroy({where: {id: insumoMovimentacaoDocumento.documento_id}}).then(affected => {
                    if(affected > 0) {
                        excluiu = true;
                    }
                });
            }
        }
        return excluiu;    
    }    
}

module.exports = InsumoMovimentacaoDocumento;