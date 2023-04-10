/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Rotas de "Insumo"
 *          @see controllers\insumo-controller.js
 *          @see middleware\precheck.js
 *          @see middleware\auth.js
 ************************************************************************************/
const { Router } = require('express');

const InsumoController = require('../controllers/insumo-controller');

const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const PrecheckMiddleware = require('../middleware/precheck');

const router = Router();

/** ******************** CRUD DE INSUMO ********************* */

/** Lista paginada de todos os insumos */
router.get('/insumo/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    InsumoController.listAll);
/** Um Insumo específico */
router.get('/insumo/:id', 
    [AuthMiddleware.bearer], 
    InsumoController.singleObject);
/** Cria um novo objeto de Insumo */
router.post('/insumo', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    InsumoController.cria);
/** Atualiza um objeto de Insumo específico */
router.put('/insumo/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    InsumoController.atualiza);
/** Exclui um objeto de Insumo específico */
router.delete('/insumo/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    InsumoController.exclui);

/** ******************* OUTRAS ROTAS DE INSUMO **************** */
         
/** Saldo disponível de Insumo específico */
router.get('/insumo/:id/disponivel', 
    [AuthMiddleware.bearer], 
    InsumoController.disponivel);

/** Tipos enumerados de insumo */
router.get('/insumo/tipos/tipo', 
    [AuthMiddleware.bearer], 
    InsumoController.tipos);

module.exports = router;