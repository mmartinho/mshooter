/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "PCE"
 ************************************************************************************/
const CRUDController = require('./crud-controller');
const pceDoEsportista = require('../models/funcoes/pce');
const tipoPCE = require('../models/types/pce-tipo');
const { Op, DataTypes } = require('sequelize');

class PCEController extends CRUDController{

    static async listAll(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { offset, limit } = req.params;
        const { q } = req.query;
        if(esportista) {
            try {
                const lista = await pceDoEsportista.lista(esportista.id, limit, offset, q);
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
                const item = await pceDoEsportista.item(id, esportista.id);
                if(item)
                    return res.status(200).json(item);
                else 
                    return res.status(404).json({message:`PCE ID ${id} não encontrado`});
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
            const itemCriado = await pceDoEsportista.criaItem(esportista.id, dados);
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
            const itemAtualizado = await pceDoEsportista.atualizaItem(id, esportista.id, novosDados);
            if(itemAtualizado) {
                return res.status(200).json(itemAtualizado);
            } else {
                return res.status(404).json({message: `PCE ID ${id} não foi encontrado`});
            }
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
            const excluiu = await pceDoEsportista.excluiItem(id, esportista.id);
            if(excluiu) 
                return res.status(200).json({ message : `PCE ID ${id} foi excluído com sucesso`});
            else 
                return res.status(404).json({message: `PCE ID ${id} não foi encontrado`}); 
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }       
    }  
    
    static async tipos(req, res) {   
        try {
            const lista = tipoPCE.lista();
            return res.status(200).json(lista);                        
        } catch (error) {
            return resStatus(error, res); 
        }         
    }    

}

module.exports = PCEController;