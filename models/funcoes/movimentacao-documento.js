const db = require('../../models');
const Movimentacao = require('./movimentacao');
const MovimentacaoNotFoundError = require('../../shared/errors/movimentacao-not-found');

class MovimentacaoDocumento {

    /**
     * @param integer esportista_id
     * @param integer movimentacao_id 
     * @param integer documento_id
     * @throws MovimentacaoNotFoundError 
     * @returns MovimentacaoDocumento | null
     */
    static async busca(esportista_id, movimentacao_id, documento_id) {
        const movimentacao = await Movimentacao.encontrar(esportista_id, movimentacao_id);
        const criteria = {
            where: { 
                movimentacao_id: Number(movimentacao_id), 
                documento_id: Number(documento_id) 
            }
        }
        if(!movimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação ID ${movimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }  
        const one = await db.MovimentacaoDocumento.findOne(criteria);
        return one;    
    }

    /**
     * @param integer esportista_id
     * @param integer movimentacao_id 
     * @param integer documento_id
     * @throws MovimentacaoNotFoundError 
     * @returns MovimentacaoDocumento | null
     */    
    static async mostra(esportista_id, movimentacao_id, documento_id) {
        const movimentacao = await Movimentacao.encontrar(esportista_id, movimentacao_id);
        const criteria = {
            where: { 
                movimentacao_id: Number(movimentacao_id), 
                documento_id: Number(documento_id) 
            },
            include: ['Movimentacao','documentoSemConteudo']
        }
        if(!movimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação ID ${movimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }  
        const one = await db.MovimentacaoDocumento.findOne(criteria);
        return one;    
    }    

    /**
     * @param integer esportista_id
     * @param integer movimentacao_id
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @throws MovimentacaoNotFoundError
     * @returns {*}
     */
     static async lista(esportista_id, movimentacao_id, limit=null, offset=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: { movimentacao_id: Number(movimentacao_id) }, 
            include: ['Movimentacao','documentoSemConteudo'] 
        } 
        const movimentacao = await Movimentacao.encontrar(esportista_id, movimentacao_id);
        if(!movimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação ID ${movimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }              
        if(limit === null || offset === null) {
            all = await db.MovimentacaoDocumento.findAll(criteria);
            return all;            
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset)
            await db.MovimentacaoDocumento.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'MovimentacaoDocumento', total, rows : all};            
        }            
    }    

    /**
     * @param integer esportista_id
     * @param integer movimentacao_id 
     * @param integer documento_id 
     * @throws MovimentacaoNotFoundError
     * @returns boolean
     */
    static async existe(esportista_id, movimentacao_id, documento_id) {
        const movimentacao = await Movimentacao.encontrar(esportista_id, movimentacao_id);
        if(!movimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação ID ${movimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }          
        const existe = await MovimentacaoDocumento.busca(esportista_id, movimentacao_id, documento_id);
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * @param integer esportista_id 
     * @param integer movimentacao_id 
     * @param integer documento_id 
     * @throws Error | MovimentacaoNotFoundError
     * @returns InsumoMovimentacaoDocumento | null
     */
    static async criar(esportista_id, movimentacao_id, documento_id) {
        const movimentacao = await Movimentacao.encontrar(esportista_id, movimentacao_id);
        if(!movimentacao) {
            throw new MovimentacaoNotFoundError(
                `Movimentação de Insumo ID ${movimentacao_id} não é do esportista ID ${esportista_id} ou não existe`
            );
        }        
        var movimentacaoDocumentoCreated = null;
        await db.MovimentacaoDocumento.create({
            movimentacao_id: Number(movimentacao_id), 
            documento_id: Number(documento_id)
        }).then(movimentacaoDocumento => {
            movimentacaoDocumentoCreated = movimentacaoDocumento;
            }).catch(error => {
                throw new Error(
                    `Não possível criar Documento de movimentação ID ${movimentacao_id} `+
                    `${error.message}`
                );
            });
        return movimentacaoDocumentoCreated;
    }    

    /**
     * @param integer esportista_id
     * @param integer movimentacao_id 
     * @param integer documento_id
     * @returns boolean
     */
    static async exclui(esportista_id, movimentacao_id, documento_id) {
        var excluiu = false;
        const movimentacao = await Movimentacao.encontrar(esportista_id, movimentacao_id);
        if(movimentacao) {
            const criteria = {
                where: { 
                    movimentacao_id : Number(movimentacao_id), 
                    documento_id: Number(documento_id) 
                }
            }
            const movimentacaoDocumento = await db.MovimentacaoDocumento.findOne(criteria);
            if(movimentacaoDocumento) {
                await db.Documento.destroy({where: {id: movimentacaoDocumento.documento_id}}).then(affected => {
                    if(affected > 0) {
                        excluiu = true;
                    }
                });
            }
        }
        return excluiu;    
    }    
}

module.exports = MovimentacaoDocumento;