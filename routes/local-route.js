const { Router } = require('express');
const LocalController = require('../controllers/local-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** List all objects */
router.get('/local/paginada/:offset/:limit', [AuthMiddleware.bearer], LocalController.listAll);
/** Get a single object */
router.get('/local/:id', [AuthMiddleware.bearer], LocalController.singleObject);
/** Create a single object */
router.post('/local', [AuthMiddleware.bearer], LocalController.cria);
/** Update a single object */
router.put('/local/:id', [AuthMiddleware.bearer], LocalController.atualiza);
/** Delete a single object */
router.delete('/local/:id', [AuthMiddleware.bearer], LocalController.exclui);

/** List all MunicaoUtilizada objects */
router.get('/local/:id/habitualidade/paginada/:offset/:limit', [AuthMiddleware.bearer], LocalController.listaHabitualidades);
/** Get a single MunicaoUtilizada object */
router.get('/local/:id/habitualidade/:habitualidade_id', [AuthMiddleware.bearer], LocalController.mostraHabitualidade);
/** Create new MunicaoUtilizada object */
router.post('/local/:id/habitualidade', [AuthMiddleware.bearer], LocalController.criaHabitualidade);
/** Update a single MunicaoUtilizada object */
router.put('/local/:id/habitualidade/:habitualidade_id', [AuthMiddleware.bearer], LocalController.atualizaHabitualidade);
/** Delete a single MunicaoUtilizada object */
router.delete('/local/:id/habitualidade/:habitualidade_id', [AuthMiddleware.bearer], LocalController.excluiHabitualidade);

module.exports = router;