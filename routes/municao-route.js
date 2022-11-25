const { Router } = require('express');
const MunicaoController = require('../controllers/municao-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** List all objects */
router.get('/municao', [AuthMiddleware.bearer], MunicaoController.listAll);
/** Get a single object */
router.get('/municao/:id', [AuthMiddleware.bearer], MunicaoController.singleObject);
/** Create a single object */
router.post('/municao', [AuthMiddleware.bearer], MunicaoController.cria);
/** Update a single object */
router.put('/municao/:id', [AuthMiddleware.bearer], MunicaoController.atualiza);
/** Delete a single object */
router.delete('/municao/:id', [AuthMiddleware.bearer], MunicaoController.exclui);

module.exports = router;