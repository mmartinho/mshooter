const { Router } = require('express');
const LocalController = require('../controllers/local-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** List all objects */
router.get('/local', [AuthMiddleware.bearer], LocalController.listAll);
/** Get a single object */
router.get('/local/:id', [AuthMiddleware.bearer], LocalController.singleObject);
/** Create a single object */
router.post('/local', [AuthMiddleware.bearer], LocalController.cria);
/** Update a single object */
router.put('/local/:id', [AuthMiddleware.bearer], LocalController.atualiza);
/** Delete a single object */
router.delete('/local/:id', [AuthMiddleware.bearer], LocalController.exclui);

module.exports = router;