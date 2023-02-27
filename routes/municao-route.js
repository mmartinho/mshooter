const { Router } = require('express');
const MunicaoController = require('../controllers/municao-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const PrecheckMiddleware = require('../middleware/precheck');

const router = Router();

/** ******************* CRUD DE MUNICAO *********************** */

/** Lista paginada de todas as munições */
router.get('/municao/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    MunicaoController.listAll);
/** Uma Munição específica */
router.get('/municao/:id', 
    [AuthMiddleware.bearer], 
    MunicaoController.singleObject);
/** Cria um novo objeto de Munição */
router.post('/municao', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MunicaoController.cria);
/** Atualiza um objeto de Munição específico */
router.put('/municao/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MunicaoController.atualiza);
/** Exclui um objeto de Munição específica */
router.delete('/municao/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MunicaoController.exclui);

/** ******************* OUTRAS ROTAS DE MUNICAO **************** */
         
/** Saldo disponível de Insumo específico */
router.get('/municao/:id/disponivel', 
    [AuthMiddleware.bearer], 
    MunicaoController.disponivel);

module.exports = router;