const { Router } = require('express');
const LocalController = require('../controllers/local-controller');
const MunicaoUtilizadaController = require('../controllers/municao-utilizada-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** ************************* LOCAL ******************************** */

/** Lista paginada de todos os Locais frequentado pelo Esportista */
router.get('/local/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    LocalController.listAll);
/** Um Local específico frequentado pelo Espostista */
router.get('/local/:id', 
    [AuthMiddleware.bearer], 
    LocalController.singleObject);
/** Cria um novo Local frequentado pelo Esportista */
router.post('/local', 
    [AuthMiddleware.bearer], 
    LocalController.cria);
/** Atualiza um Local específico frequentado por Esportista */
router.put('/local/:id', 
    [AuthMiddleware.bearer], 
    LocalController.atualiza);
/** Exclui um Local específico frequentado por Esportista */
router.delete('/local/:id', 
    [AuthMiddleware.bearer], 
    LocalController.exclui);

/** ********* MUNICAO UTILIZADA (registro de uso de PCE e Munição no Local por Esportista) *********** */

/** Lista paginada de todas as MunicaoUtilizadas registradas pelo Esportista no Local */
router.get('/local/:local_id/pce/:pce_id/municao/:municao_id/municaoutilizada/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    MunicaoUtilizadaController.lista);
/** Uma MunicaoUtilizada registrada pelo Esportista no Local */
router.get('/local/:local_id/pce/:pce_id/municao/:municao_id/municaoutilizada/:municaoutilizada_id', 
    [AuthMiddleware.bearer], 
    MunicaoUtilizadaController.mostra);
/** Registra MunicaoUtilizada de Esportista no Local */
router.post('/local/:local_id/pce/:pce_id/municao/:municao_id/municaoutilizada', 
    [AuthMiddleware.bearer], 
    MunicaoUtilizadaController.cria);
/** Atualiza o registro de MunicaoUtilizada de Esportista no Local */
router.put('/local/:local_id/pce/:pce_id/municao/:municao_id/municaoutilizada/:municaoutilizada_id', 
    [AuthMiddleware.bearer], 
    MunicaoUtilizadaController.atualiza);
/** Exclui um registro de MunicaoUtilizada de Esportista */
router.delete('/local/:local_id/pce/:pce_id/municao/:municao_id/municaoutilizada/:municaoutilizada_id', 
    [AuthMiddleware.bearer], 
    MunicaoUtilizadaController.exclui);

module.exports = router;