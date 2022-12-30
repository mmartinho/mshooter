const CRUDController = require('./crud-controller');
const MunicaoUtilizada = require('../models/funcoes/municao-utilizada');

class MunicaoUtilizadaController extends CRUDController {
    
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { local_id, pce_id, municao_id } = req.params;
            const { qtde_usada, qtde_transportada, qtde_local, observacao, proposito, dthr_utilizacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(proposito && dthr_utilizacao)) {
                return res.status(400).json({message: 'Propósito e Data Hora da frequência são campos requeridos' });
            }             
            const municaoUtilizadaCriada = await MunicaoUtilizada.criar(
                esportista.id, local_id, pce_id, municao_id, 
                {dthr_utilizacao, proposito, qtde_usada, qtde_transportada, qtde_local, observacao}
            ); 
            if(municaoUtilizadaCriada) {
                return res.status(201).json(municaoUtilizadaCriada);
            } else {
                return res.status(400).json({message: `Não foi possível criar MunicaoUtilizada`});
            }           
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { local_id, pce_id, municao_id, municaoutilizada_id } = req.params;
            const { qtde_usada, qtde_transportada, qtde_local, observacao, proposito, dthr_utilizacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            const municaoUtilizadaAlterada = await MunicaoUtilizada.alterar(
                esportista.id, local_id, pce_id, municao_id, municaoutilizada_id,
                {dthr_utilizacao, proposito, qtde_usada, qtde_transportada, qtde_local, observacao}
            );
            if(municaoUtilizadaAlterada) {
                return res.status(200).json(municaoUtilizadaAlterada);
            } else {
                return res.status(404).json({message: `Não foi possível encontrar MunicaoUtilizada ID ${municaoutilizada_id}`});
            }        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }
    }

    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { local_id, pce_id, municao_id, municaoutilizada_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const excluida = await MunicaoUtilizada.excluir(
                esportista.id, local_id, pce_id, municao_id, municaoutilizada_id
            );
            if(excluida) {
                return res.status(200).json({message: `MunicaoUtilizada ID ${municaoutilizada_id} foi excluída com sucesso`});
            } else {
                return res.status(404).json({message: `Não foi possível encontrar MunicaoUtilizada ID ${municaoutilizada_id}`});
            }
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async mostra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { local_id, pce_id, municao_id, municaoutilizada_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const municaoUtilizada = await MunicaoUtilizada.buscar(
                esportista.id, local_id, pce_id, municao_id, municaoutilizada_id
            );
            if(municaoUtilizada) {
                return res.status(200).json(municaoUtilizada);
            } else { 
                return res.status(404).json({message: `Não foi possível encontrar MunicaoUtilizada ID ${municaoutilizada_id}`});
            }           
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { local_id, pce_id, municao_id, offset, limit } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            const municoesUtilizadas = await MunicaoUtilizada.lista(esportista.id, local_id, pce_id, municao_id, limit, offset);
            return res.status(200).json(municoesUtilizadas);                        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    }    
   
}

module.exports = MunicaoUtilizadaController;