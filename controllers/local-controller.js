const CRUDController = require('./crud-controller');
const localDoEsportista = require('../models/funcoes/local');
const tipoLocal = require('../models/types/local-tipo');

class LocalController extends CRUDController{
    static async listAll(req, res) {
        const { limit, offset } = req.params;
        const esportista = req.esportista; // vem do middleware
        if(esportista) {
            try {
                const lista = await localDoEsportista.lista(esportista.id, limit, offset);
                return res.status(200).json(lista);
            } catch (error) {
                return res.status(500).json({ message: error.message }); 
            }            
        } 
        return super.listAll(req, res); // se adm   
    }

    static async singleObject(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        if(esportista) {
            try {
                const item = await localDoEsportista.item(id, esportista.id);
                if(!item) {
                    return res.status(404).json({ message : `Local ID ${id} não encontrado` }); 
                }
                return res.status(200).json(item);
            } catch (error) {
                return res.status(500).json({ message: error.message }); 
            }            
        } 
        return super.singleObject(req, res);  // se adm       
    } 
    
    static async cria(req, res) {
        const esportista = req.esportista; // vem do middleware
        const dados = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }
        try {
            const itemCriado = await localDoEsportista.criaItem(esportista.id, dados);
            return res.status(201).json(itemCriado);
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }
    }

    static async atualiza(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        const novosDados = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }
        try {
            const itemAtualizado = await localDoEsportista.atualizaItem(id, esportista.id, novosDados);
            if(!itemAtualizado) {
                return res.status(404).json({message: `Local ID ${id} registrado pelo Esportista '${esportista.nome}' não foi encontrado`});
            }
            return res.status(200).json(itemAtualizado);
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }            
    }    

    static async exclui(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }    
        try {
            await localDoEsportista.excluiItem(id, esportista.id);
            return res.status(200).json({ message : `Local ID ${id} registrado pelo Esportista '${esportista.nome}' foi excluído com sucesso`});
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }       
    }  
    
    static async tipos(req, res) {   
        try {
            const lista = tipoLocal.lista();
            return res.status(200).json(lista);                        
        } catch (error) {
            return resStatus(error, res); 
        }         
    }    
}

module.exports = LocalController;