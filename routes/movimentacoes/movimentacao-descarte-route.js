/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Movimentacao" de descarte de Insumo ou Municao
 *          @see controllers\movimentacoes\descarte-controller.js   
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');

const DescarteController = require('../../controllers/movimentacoes/descarte-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** ****************************** INSUMO ******************************* */

/** Cria Movimentação de 'saída por descarte' do Insumo */
router.post('/movimentacao/descarte/insumo/:insumo_id',            
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    DescarteController.cria);
/** Atualiza Movimentação 'saída por descarte' do Insumo */
router.put('/movimentacao/descarte/:movimentacao_id/insumo/:insumo_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    DescarteController.atualiza); 
        
/** **************************** MUNICAO *********************************** */

/** Cria Movimentação de 'saída por descarte' da Munição */
router.post('/movimentacao/descarte/municao/:municao_id',            
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    DescarteController.cria);
/** Atualiza Movimentação de 'saída por descarte' da Munição */
router.put('/movimentacao/descarte/:movimentacao_id/municao/:municao_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    DescarteController.atualiza);

module.exports = router;    