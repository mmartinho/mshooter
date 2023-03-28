const { Router } = require('express');
const LocalController = require('../controllers/local-controller');

const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const PrecheckMiddleware = require('../middleware/precheck');

const router = Router();

/** ************************* LOCAL ******************************** */

/** Lista paginada de todos os Locais */
router.get('/local/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    LocalController.listAll);
/** Um Local específico  */
router.get('/local/:id', 
    [AuthMiddleware.bearer], 
    LocalController.singleObject);
/** Cria um novo Local */
router.post('/local', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    LocalController.cria);
/** Atualiza um Local específico */
router.put('/local/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    LocalController.atualiza);
/** Exclui um Local específico */
router.delete('/local/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    LocalController.exclui);

/** ******************* OUTRAS ROTAS DE LOCAL **************** */ 

/** Tipos enumerados de local */
router.get('/local/tipos/tipo', 
    [AuthMiddleware.bearer], 
    LocalController.tipos);
   
module.exports = router;