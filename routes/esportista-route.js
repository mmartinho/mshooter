const { Router } = require('express');
const EsportistaController = require('../controllers/esportista-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** List all objects */
router.get('/esportista', [AuthMiddleware], EsportistaController.listAll);
/** Get a single object */
router.get('/esportista/:id', [AuthMiddleware], EsportistaController.singleObject);
/** Create a single object */
router.post('/esportista', [AuthMiddleware], EsportistaController.createObject);
/** Update a single object */
router.put('/esportista/:id', [AuthMiddleware], EsportistaController.updateObject);
/** Delete a single object */
router.delete('/esportista/:id', [AuthMiddleware], EsportistaController.deleteObject);

module.exports = router;