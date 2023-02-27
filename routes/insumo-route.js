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

module.exports = router;