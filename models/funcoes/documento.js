const db = require('../../models');

class Documento {
    /**
     * @param string numero 
     * @returns Documento | null 
     */
    static async busca(numero) {
        const one = await db.Documento.findOne({ where: { numero } });
        if(!one) {
            return null;
        }
        return one;    
    }

    /**
     * @param number id 
     * @returns Documento | null 
     */
     static async buscaPorId(id) {
        const one = await db.Documento.findOne({ where: { id } });
        if(!one) {
            return null;
        }
        return one;    
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
     * @param string arquivo 
     * @returns Documento
     * @throws Error
     */
    static async criar(nome, descricao, numero, dt_expedicao, dt_validade, arquivo) {
        var objectCreated = null;
        await db.Documento.create({nome, descricao, numero, dt_expedicao, dt_validade, arquivo})
            .then(object => {
                objectCreated = object;
            }).catch(error => {
                throw new Error(`Não foi possível criar Documento número ${numero}. ${error.message}`);
            });
        return objectCreated;
    } 
    
    /**
     * @param number id 
     * @param Documento newData 
     * @returns Documento
     * @throws Error
     */
    static async atualizar(id, newData) {
        // update
        await db.Documento.update(newData, { 
            where: { 
                id: Number(id) 
            } 
        }).catch( error => {
            throw new Error(`Não foi possível atualizar Documento id ${id}. ${error.message}`);
        });
        // search again
        const updatedOne = await db.Documento.findOne({ 
            where: { 
                id: Number(id) 
            } 
        }).catch(error => {
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