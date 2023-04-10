/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Movimentacao" de desmontagem de Municao
 *          @see controllers\movimentacoes\desmontagem-controller.js   
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');

const DesmontagemController = require('../../controllers/movimentacoes/desmontagem-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** Cria Movimentação de 'saída por desmontagem' da Munição */
router.post('/movimentacao/desmontagem/municao/:municao_id',            
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    DesmontagemController.cria);
/** Atualiza Movimentação de 'saída por desmontagem' da Munição */
router.put('/movimentacao/desmontagem/:movimentacao_id/municao/:municao_id', 
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    DesmontagemController.atualiza);

module.exports = router;    