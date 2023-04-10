/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Movimentacao" utilização de Munição
 *          @see controllers\movimentacoes\utilizacao-controller.js   
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');

const UtilizacaoController = require('../../controllers/movimentacoes/utilizacao-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** Cria Movimentação de 'saída por utilização' da Munição em Local usando PCE */
router.post('/movimentacao/utilizacao/municao/:municao_id/local/:local_id/pce/:pce_id',            
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    UtilizacaoController.cria);
/** Atualiza Movimentação de 'saída por utilização' da Munição em Local usando PCE */
router.put('/movimentacao/utilizacao/:movimentacao_id/municao/:municao_id/local/:local_id/pce/:pce_id', 
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    UtilizacaoController.atualiza);
/** Lista paginada das Movimentações de 'saída por utilização' da Munição em Local usando PCE */
router.get('/movimentacao/utilizacao/municao/:municao_id/local/:local_id/pce/:pce_id/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    UtilizacaoController.lista);   
/** Mostra Movimentação de 'saída por utilização' da Munição em Local usando PCE */
router.get('/movimentacao/utilizacao/:movimentacao_id/municao/:municao_id/local/:local_id/pce/:pce_id', 
    [AuthMiddleware.bearer], 
    UtilizacaoController.mostra);
/** Exclui Movimentação de 'saída por utilização' da Munição em Local usando PCE */
router.delete('/movimentacao/utilizacao/:movimentacao_id/municao/:municao_id/local/:local_id/pce/:pce_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    UtilizacaoController.exclui); 

module.exports = router; 