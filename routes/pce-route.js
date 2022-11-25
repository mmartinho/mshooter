const { Router } = require('express');
const PCEController = require('../controllers/pce-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** List all objects */
router.get('/pce', [AuthMiddleware.bearer], PCEController.listAll);
/** Get a single */
router.get('/pce/:id', [AuthMiddleware.bearer], PCEController.singleObject);
/** Create a single object */
router.post('/pce', [AuthMiddleware.bearer], PCEController.cria);
/** Update a single object */
router.put('/pce/:id', [AuthMiddleware.bearer], PCEController.atualiza);
/** Delete a single object */
router.delete('/pce/:id', [AuthMiddleware.bearer], PCEController.exclui);

/** Cria documento de Compra de PCE */
router.post('/pce/:pce_id/compra', [AuthMiddleware.bearer], PCEController.criaDocumentoCompra);
/** Exclui documento de Compra de PCE */
router.delete('/pce/:pce_id/compra/:documento_id', [AuthMiddleware.bearer], PCEController.excluiDocumentoCompra);
/** Altera documento de Compra de PCE */
router.put('/pce/:pce_id/compra/:documento_id', [AuthMiddleware.bearer], PCEController.atualizaDocumentoCompra);
/** Lista todos os documento de Compra de PCE */
router.get('/pce/:pce_id/compra/', [AuthMiddleware.bearer], PCEController.listaTodosDocumentoCompra);
/** Mostra um documento de Compra de PCE */
router.get('/pce/:pce_id/compra/:documento_id', [AuthMiddleware.bearer], PCEController.visualizaDocumentoCompra);
/** Download do arquivo do documento de Compra de PCE */
router.get('/pce/:pce_id/compra/:documento_id/download', [AuthMiddleware.bearer], PCEController.downloadDocumentoCompra);
module.exports = router;