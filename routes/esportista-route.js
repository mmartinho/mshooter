const { Router } = require('express');
const EsportistaController = require('../controllers/esportista-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** List all objects */
router.get('/esportista/paginada/:offset/:limit', [AuthMiddleware.bearer], EsportistaController.listAll);
/** Get a single object */
router.get('/esportista/:id', [AuthMiddleware.bearer], EsportistaController.singleObject);
/** Create a single object */
router.post('/esportista', [AuthMiddleware.bearer], EsportistaController.createObject);
/** Update a single object */
router.put('/esportista/:id', [AuthMiddleware.bearer], EsportistaController.updateObject);
/** Delete a single object */
router.delete('/esportista/:id', [AuthMiddleware.bearer], EsportistaController.deleteObject);

module.exports = router;