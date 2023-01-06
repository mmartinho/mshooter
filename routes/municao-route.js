const { Router } = require('express');
const MunicaoController = require('../controllers/municao-controller');
const InsumoMovimentacaoController = require('../controllers/insumo-molvimentacao-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** ******************* CRUD DE MUNICAO *********************** */

/** Lista paginada de todas as munições do Esportista */
router.get('/municao/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    MunicaoController.listAll);
/** Uma Munição específica do Esportista */
router.get('/municao/:id', 
    [AuthMiddleware.bearer], 
    MunicaoController.singleObject);
/** Cria um novo objeto de Munição de Esportista */
router.post('/municao', 
    [AuthMiddleware.bearer], 
    MunicaoController.cria);
/** Atualiza um objeto de Munição de Esportista específico */
router.put('/municao/:id', 
    [AuthMiddleware.bearer], 
    MunicaoController.atualiza);
/** Exclui um objeto de Munição de Esportista específica */
router.delete('/municao/:id', 
    [AuthMiddleware.bearer], 
    MunicaoController.exclui);

/** *************************************** MOVIMENTACAO DE INSUMO ******************************************** */

/** Lista paginada de todas as Movimentações de Insumos registradas pelo Esportista para Munição Específica */
router.get('/municao/:municao_id/insumomovimentacao/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoController.lista); 

module.exports = router;