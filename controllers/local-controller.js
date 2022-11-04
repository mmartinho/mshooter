const CRUDController = require('./crud-controller');
const Local = require('../models/funcoes/local');

/**
 * Local handling
 */
class LocalController extends CRUDController{
    static async listAll(req, res) {
        const esportista = req.esportista; // vem do middleware
        if(esportista) {
            try {
                const lista = await Local.listaDoEsportista(esportista.id);
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
                const item = await Local.itemDoEsportista(id, esportista.id);
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
            const itemCriado = await Local.criaItemDoEsportista(esportista.id, dados);
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
            const itemAtualizado = await Local.atualizaItemDoEsportista(id, esportista.id, novosDados);
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
            await Local.excluiItemDoEsportista(id, esportista.id);
            return res.status(200).json({ message : `Local ID ${id} registrado pelo Esportista '${esportista.nome}' foi excluído com sucesso`});
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }       
    }     
}

module.exports = LocalController;