const { Router } = require('express');
const MunicaoController = require('../controllers/municao-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

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

module.exports = router;