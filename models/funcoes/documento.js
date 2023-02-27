const db = require('../../models');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Documento {
    /**
     * @param string conteudo 
     * @param string ext 
     * @returns string
     */
    static defineArquivoTemporario(conteudo, ext) {
        let tempFilePath='';
        if(conteudo && ext) {
            tempFilePath =  __basedir + `/${process.env.TEMP_FILE_DIR}/`+`tmp-${uuidv4()}.${ext}`;
            fs.writeFileSync(tempFilePath, conteudo);   
        }     
        return tempFilePath;
    }

    /**
     * @param string tempFilePath 
     */
    static apagaArquivoTemporario(tempFilePath) {
        fs.rmSync(tempFilePath); 
    }

    /**
     * @param string tempFilePath 
     * @return string
     */
    static leArquivoTemporario(tempFilePath) {
        return fs.readFileSync(tempFilePath);
    }

    /**
     * @param number esportista_id
     * @param string numero 
     * @param boolean temp
     * @returns Documento | null 
     */
    static async busca(esportista_id, numero, temp=false) {
        let one = null;
        const criteria = {where: {numero, esportista_id: Number(esportista_id)}};
        if(temp) {
            one = await db.Documento.findOne(criteria);
        } else {
            one = await db.Documento.scope('semConteudo').findOne(criteria);
        }
        if(one) {
            if(temp && one.arquivoConteudo) {
                one.arquivo = Documento.defineArquivoTemporario(one.arquivoConteudo, one.arquivoExt);
            }
            return one;
        }
        return null;    
    }

    /**
     * @param number esportista_id
     * @param number id 
     * @param boolean temp
     * @returns Documento | null 
     */
     static async buscaPorId(esportista_id, id, temp=false) {
        let one = null;
        const criteria = {where: {id: Number(id), esportista_id: Number(esportista_id)}};
        if(temp) {
            one = await db.Documento.findOne(criteria);
        } else {
            one = await db.Documento.scope('semConteudo').findOne(criteria);    
        } 
        if(one) {
            if(temp && one.arquivoConteudo) { 
                one.arquivo = Documento.defineArquivoTemporario(one.arquivoConteudo, one.arquivoExt); 
            } 
            return one;
        } else {
            return null;  
        }
    } 
    
    /**
     * @param number esportista_id
     * @param string nome 
     * @param boolean temp
     * @returns Documento | null 
     */
    static async buscaPorNome(esportista_id, nome, temp=false) {
        let one = null;
        const criteria = {where: {nome, esportista_id: Number(esportista_id)}};
        if(temp) {
            one = await db.Documento.findOne(criteria);
        } else {
            one = await db.Documento.scope('semConteudo').findOne(criteria);    
        } 
        if(one) {
            if(temp && one.arquivoConteudo) { 
                one.arquivo = Documento.defineArquivoTemporario(one.arquivoConteudo, one.arquivoExt); 
            } 
            return one;
        } else {
            return null;  
        }        
    }

    /**
     * @param integer esportista_id 
     * @param string dt_expedicao 
     * @param string dt_validade 
     * @param string nome 
     * @param string numero 
     * @param boolean temp 
     * @returns 
     */
    static async buscaPorCampos(esportista_id, id=null, dt_expedicao=null, dt_validade=null, nome=null, numero=null, temp=false) {
        let one = null;
        let criteria = {where: {esportista_id: Number(esportista_id)}};
        if(id) {criteria.where.id = Number(id);}
        if(dt_expedicao) {criteria.where.dt_expedicao = dt_expedicao;}
        if(dt_validade) {criteria.where.dt_validade = dt_validade;}
        if(nome) {criteria.where.nome = nome;}
        if(numero) {criteria.where.numero = numero;}
        if(temp) {
            one = await db.Documento.findOne(criteria);
        } else {
            one = await db.Documento.scope('semConteudo').findOne(criteria);    
        } 
        if(one) {
            if(temp && one.arquivoConteudo) { 
                one.arquivo = Documento.defineArquivoTemporario(one.arquivoConteudo, one.arquivoExt); 
            } 
            return one;
        } else {
            return null;  
        }        
    }

    /**
     * @param number esportista_id
     * @param string numero 
     * @returns boolean
     */
    static async existe(esportista_id, numero) {
        const existe = await Documento.busca(esportista_id, numero);
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * @param number esportista_id
     * @param string nome 
     * @param string descricao 
     * @param string numero 
     * @param string dt_expedicao 
     * @param string dt_validade 
     * @param UploadedFile arquivo 
     * @returns Documento
     * @throws Error
     */
    static async criar(esportista_id, nome, descricao, numero, dt_expedicao, dt_validade, arquivo=null) {
        var objectCreated = null;
        await db.Documento
            .create({
                esportista_id: Number(esportista_id),
                nome, 
                descricao, 
                numero, 
                dt_expedicao, 
                dt_validade, 
                arquivoNome: arquivo ? arquivo.name : null,
                arquivoExt : arquivo ? arquivo.name.split('.').pop() : null,
                arquivoConteudo : arquivo ? Documento.leArquivoTemporario(arquivo.tempFilePath) : null
            })
            .then(object => {
                objectCreated = 
                { 
                    id: object.id,
                    nome: object.nome,
                    descricao : object.descricao,
                    numero : object.numero,
                    dt_expedicao : object.dt_expedicao,
                    dt_validade : object.dt_validade,
                    arquivoNome : object.arquivoNome
                };                
                if(arquivo) {Documento.apagaArquivoTemporario(arquivo.tempFilePath);}
            }).catch(error => {
                throw new Error(`Não foi possível criar Documento número ${numero}. ${error.message}`);
            });
        return objectCreated;
    } 
    
    /**
     * @param number esportista_id
     * @param number id 
     * @param Documento novosDados 
     * @param UploadedFile arquivo
     * @returns Documento
     * @throws Error
     */
    static async atualizar(esportista_id, id, novosDados, arquivo=null) {
        if(arquivo) {
            novosDados.arquivoNome = arquivo.name;
            novosDados.arquivoExt = arquivo.name.split('.').pop(),
            novosDados.arquivoConteudo = Documento.leArquivoTemporario(arquivo.tempFilePath);
        }
        const criteria = {where: {id: Number(id), esportista_id: Number(esportista_id)}};
        // update
        await db.Documento
            .update(novosDados, criteria)
            .then(object => {
                if(arquivo) {
                    Documento.apagaArquivoTemporario(arquivo.tempFilePath); 
                } 
            })
            .catch( error => {
                throw new Error(`Não foi possível atualizar Documento id ${id}. ${error.message}`);
            });
        // search again
        const updatedOne = await db.Documento
            .scope('semConteudo')
            .findOne(criteria)
            .catch(error => {
                throw new Error(`Não foi possível encontrar o Documento id ${id} atualizado. ${error.message}`);
            }); 
        return updatedOne;        
    }

    /**
     * @param number esportista_id
     * @param number id 
     * @returns boolean
     */
    static async excluir(esportista_id, id) {
        var affected = 0;
        await db.Documento.destroy({where: {id: Number(id), esportista_id: Number(esportista_id)}})
            .then(result => {
                affected = result;
            });
        if(affected > 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Documento;