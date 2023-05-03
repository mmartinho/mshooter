/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Municao"
 ************************************************************************************/
const CRUDController = require('./crud-controller');
const municaoDoEsportista = require('../models/funcoes/municao');
const Estoque = require('../models/funcoes/estoque');

class MunicaController extends CRUDController {
    static async listAll(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { limit, offset } = req.params;
        const { q } = req.query;
        if(esportista) {
            try {
                const lista = await municaoDoEsportista.lista(esportista.id, limit, offset, q);
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
                const item = await municaoDoEsportista.item(id, esportista.id);
                if(!item) {
                    return res.status(404).json({ message : `Munição ID ${id} não encontrada` }); 
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
        const { nome, calibre } = req.body;
        const dados = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }
        if(!(nome && calibre)) {
            return res.status(400).json({message: 'Nome e calibre são campos requeridos' });
        }
        try {
            const itemCriado = await municaoDoEsportista.criaItem(esportista.id, dados);
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
            const itemAtualizado = await municaoDoEsportista.atualizaItem(id, esportista.id, novosDados);
            if(!itemAtualizado) {
                return res.status(404).json({message: `Munição ID ${id} não foi encontrada`});
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
            const excluiu = await municaoDoEsportista.excluiItem(id, esportista.id);
            if(excluiu){
                return res.status(200).json({ message : `Munição ID ${id} foi excluída com sucesso`});
            } else {
                return res.status(404).json({ message : `Munição ID ${id} não foi encontrada`});
            }
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }       
    }   
    
    static async disponivel(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }    
        try {
            const item = await municaoDoEsportista.item(id, esportista.id);
            if(!item) {
                return res.status(404).json({ message : `Munição ID ${id} não encontrada` }); 
            } else {
                const infoEstoqueItem = await Estoque.municao(esportista.id, item);
                return res.status(200).json(infoEstoqueItem);                
            }            
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }         
    }    
}

module.exports = MunicaController;