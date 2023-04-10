/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Movimentacao" de aquisicao de Insumo ou Municao
 *          @see controllers\movimentacoes\aquisicao-controller.js   
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');

const AquisicaoController = require('../../controllers/movimentacoes/aquisicao-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** ****************************** INSUMO ******************************* */

/** Cria Movimentação de 'entrada por aquisição' do Insumo */
router.post('/movimentacao/aquisicao/insumo/:insumo_id',            
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    AquisicaoController.cria);
/** Atualiza Movimentação 'entrada por aquisição' do Insumo */
router.put('/movimentacao/aquisicao/:movimentacao_id/insumo/:insumo_id', 
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    AquisicaoController.atualiza);          

/** ***************************** MUNICAO ******************************* */

/** Cria Movimentação de 'entrada por aquisição' da Munição */
router.post('/movimentacao/aquisicao/municao/:municao_id',            
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    AquisicaoController.cria);
/** Atualiza Movimentação de 'entrada por aquisição' da Munição */
router.put('/movimentacao/aquisicao/:movimentacao_id/municao/:municao_id', 
    [AuthMiddleware.bearer, PrecheckMiddleware.verificacaoBody], 
    AquisicaoController.atualiza); 

module.exports = router;    