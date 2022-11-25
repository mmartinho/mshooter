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
     * @param string numero 
     * @param boolean temp
     * @returns Documento | null 
     */
    static async busca(numero, temp=false) {
        let one = null;
        if(temp) {
            one = await db.Documento.findOne({ where: { numero } });
        } else {
            one = await db.Documento.scope('semConteudo').findOne({ where: { numero } });
        }
        if(one) {
            if(temp) {
                one.arquivo = Documento.defineArquivoTemporario(one.arquivoConteudo, one.arquivoExt);
            }
            return one;
        }
        return null;    
    }

    /**
     * @param number id 
     * @param boolean temp
     * @returns Documento | null 
     */
     static async buscaPorId(id, temp=false) {
        let one = null;
        if(temp) {
            one = await db.Documento.findOne({ where: { id } });
        } else {
            one = await db.Documento.scope('semConteudo').findOne({ where: { id } });    
        } 
        if(one) {
            if(temp) { 
                one.arquivo = Documento.defineArquivoTemporario(one.arquivoConteudo, one.arquivoExt); 
            } 
            return one;
        } else {
            return null;  
        }
    }    

    /**
     * @param string numero 
     * @returns boolean
     */
    static async existe(numero) {
        const existe = await Documento.busca(numero);
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * @param string nome 
     * @param string descricao 
     * @param string numero 
     * @param string dt_expedicao 
     * @param string dt_validade 
     * @param UploadedFile arquivo 
     * @returns Documento
     * @throws Error
     */
    static async criar(nome, descricao, numero, dt_expedicao, dt_validade, arquivo) {
        var objectCreated = null;
        await db.Documento
            .create({
                nome, 
                descricao, 
                numero, 
                dt_expedicao, 
                dt_validade, 
                arquivoNome: arquivo.name,
                arquivoExt : arquivo.name.split('.').pop(),
                arquivoConteudo : Documento.leArquivoTemporario(arquivo.tempFilePath)
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
                Documento.apagaArquivoTemporario(arquivo.tempFilePath);
            }).catch(error => {
                throw new Error(`Não foi possível criar Documento número ${numero}. ${error.message}`);
            });
        return objectCreated;
    } 
    
    /**
     * @param number id 
     * @param Documento novosDados 
     * @param UploadedFile arquivo
     * @returns Documento
     * @throws Error
     */
    static async atualizar(id, novosDados, arquivo=null) {
        if(arquivo) {
            novosDados.arquivoNome = arquivo.name;
            novosDados.arquivoExt = arquivo.name.split('.').pop(),
            novosDados.arquivoConteudo = Documento.leArquivoTemporario(arquivo.tempFilePath);
        }
        // update
        await db.Documento
            .update(novosDados, {where: {id: Number(id)}})
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
            .findOne({where: {id: Number(id)}})
            .catch(error => {
                throw new Error(`Não foi possível encontrar o Documento id ${id} atualizado. ${error.message}`);
            }); 
        return updatedOne;        
    }

    /**
     * @param number id 
     * @returns number
     * @throws Error
     */
    static async excluir(id) {
        var affected = 0;
        await db.Documento.destroy({ where: { id } })
            .then(result => {
                affected = result;
            })
            .catch(error => {
                throw new Error(`Não foi possível excluir Documento de id ${id}. ${error.message}`);
            }); 
        if(affected > 0) {
            return id;
        } else {
            throw new Error(`Documento de id ${id} não foi encontrado`);
        }  
    }
}

module.exports = Documento;