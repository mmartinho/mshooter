/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Movimentacao" de reutilização de Insumo
 *          @see controllers\movimentacoes\reutilizacao-controller.js   
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');

const ReutilizacaoController = require('../../controllers/movimentacoes/reutilizacao-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** Cria Movimentação de 'entrada por reutilização' do Insumo */
router.post('/movimentacao/reutilizacao/insumo/:insumo_id',            
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    ReutilizacaoController.cria);
/** Atualiza Movimentação 'entrada por reutilização' do Insumo*/
router.put('/movimentacao/reutilizacao/:movimentacao_id/insumo/:insumo_id', 
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    ReutilizacaoController.atualiza);

module.exports = router;    