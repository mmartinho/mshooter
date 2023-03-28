const { Router } = require('express');

const MovimentacaoController = require('../../controllers/movimentacoes/movimentacao-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** ************************* MOVIMENTACOES DE MUNICAO *************************** */

/** Lista paginada das Movimentações da Munição */
router.get('/movimentacao/municao/:municao_id/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.lista);   
/** Lista paginada das Movimentações exclusivas da Munição */
router.get('/movimentacao/municao/:municao_id/paginada/:offset/:limit/:exclusivo', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.lista); 
/** Mostra Movimentação de Munição */
router.get('/movimentacao/:movimentacao_id/municao/:municao_id/', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.mostra);
/** Exclui Movimentação da Munição */
router.delete('/movimentacao/:movimentacao_id/municao/:municao_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MovimentacaoController.exclui); 

/** ************************* MOVIMENTACOES DE INSUMO *************************** */

/** Lista paginada das Movimentações do Insumo */
router.get('/movimentacao/insumo/:insumo_id/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.lista);   
/** Lista paginada das Movimentações exclusivas do Insumo */
router.get('/movimentacao/insumo/:insumo_id/paginada/:offset/:limit/:exclusivo', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.lista); 
/** Mostra Movimentação de Munição */
router.get('/movimentacao/:movimentacao_id/insumo/:insumo_id/', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.mostra);
/** Exclui Movimentação do Insumo */
router.delete('/movimentacao/:movimentacao_id/insumo/:insumo_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MovimentacaoController.exclui);  
    
/** ************* OUTRAS ROTAS DE MOVIMENTACAO *********** */ 

/** Tipos enumerados de Movimentação */
router.get('/movimentacao/tipos/tipo', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.tipos);

/** Tipos enumerados de propósitos de Movimentação */
router.get('/movimentacao/tipos/proposito', 
    [AuthMiddleware.bearer], 
    MovimentacaoController.propositos);    

module.exports = router; 