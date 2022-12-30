const { Router } = require('express');
const EsportistaController = require('../controllers/esportista-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** Lista paginada de todos os Esportistas */
router.get('/esportista/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    EsportistaController.listAll);
/** Mostra Esportista em particular */
router.get('/esportista/:id', 
    [AuthMiddleware.bearer], 
    EsportistaController.singleObject);    
/** Cria um novo Esportista */
router.post('/esportista', 
    [AuthMiddleware.bearer], 
    EsportistaController.createObject);
/** Atualiza um Esportista específico */
router.put('/esportista/:id', 
    [AuthMiddleware.bearer], 
    EsportistaController.updateObject);    
/** Exclui um Esportista específico */
router.delete('/esportista/:id', 
    [AuthMiddleware.bearer], 
    EsportistaController.deleteObject);

module.exports = router;