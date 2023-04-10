/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Comunicacao"
 *          @see controllers\comunicacao-controller.js   
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');
const ComunicacaoController = require('../controllers/comunicacao-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const PrecheckMiddleware = require('../middleware/precheck');

const router = Router();

/** Cria Comunicação de Movimentações */
router.post('/comunicacao', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    ComunicacaoController.comunica);

/** Atualiza o protocolo da Comunicação de Movimentações */
router.put('/comunicacao/:comunicacao_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    ComunicacaoController.atualiza);

module.exports = router;