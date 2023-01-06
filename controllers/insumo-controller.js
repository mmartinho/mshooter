const CRUDController = require('./crud-controller');
const insumoDoEsportista = require('../models/funcoes/insumo');

class InsumoController extends CRUDController {
    static async listAll(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { limit, offset } = req.params;
        if(esportista) {
            try {
                const lista = await insumoDoEsportista.lista(esportista.id, limit, offset);
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
                const item = await insumoDoEsportista.item(id, esportista.id);
                if(!item) {
                    return res.status(404).json({ message : `Insumo ID ${id} não encontrado` }); 
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
        const { nome, tipo } = req.body;
        const dados = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }
        if(!(nome && tipo)) {
            return res.status(400).json({message: 'Nome e tipo são campos requeridos' });
        }
        try {
            const itemCriado = await insumoDoEsportista.criaItem(esportista.id, dados);
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
            const itemAtualizado = await insumoDoEsportista.atualizaItem(id, esportista.id, novosDados);
            if(!itemAtualizado) {
                return res.status(404).json({message: `Insumo ID ${id} não foi encontrado`});
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
            const excluiu = await insumoDoEsportista.excluiItem(id, esportista.id);
            if(excluiu) {
                return res.status(200).json({ message : `Insumo ID ${id} foi excluído com sucesso`});
            } else {
                return res.status(404).json({ message : `Insumo ID ${id} não foi encontrado`});
            }
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }       
    }     
}

module.exports = InsumoController;