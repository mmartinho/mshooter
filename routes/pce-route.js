const { Router } = require('express');
const PCEController = require('../controllers/pce-controller');
const DocumentoCompraController = require('../controllers/documento-compra-controller');
const DocumentoApostilamentoController = require('../controllers/documento-apostilamento-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** *********************** PCE ********************* */

/** Lista paginada de todos os PCEs do Esportista */
router.get('/pce/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    PCEController.listAll);
/** Um objeto PCE específico do Esportista */
router.get('/pce/:id', 
    [AuthMiddleware.bearer], 
    PCEController.singleObject);
/** Cria um novo objeto PCE para o Esportista */
router.post('/pce', 
    [AuthMiddleware.bearer], 
    PCEController.cria);
/** Atualiza um objeto PCE específico do Esportista */
router.put('/pce/:id', 
    [AuthMiddleware.bearer], 
    PCEController.atualiza);
/** Exclui objeto de PCE específico do Esportista */
router.delete('/pce/:id', 
    [AuthMiddleware.bearer], 
    PCEController.exclui);

/** ***************** DOCUMENTO DE COMPRA DO PCE ******************** */

/** Cria Documento de Compra de PCE do Esportista */
router.post('/pce/:pce_id/compra', 
    [AuthMiddleware.bearer], 
    DocumentoCompraController.cria);
/** Atualiza Documento de Compra de PCE do Esportista */
router.put('/pce/:pce_id/compra/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoCompraController.atualiza);
/** Lista Todos Documentos de Compra de PCE do Esportista */
router.get('/pce/:pce_id/compra/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    DocumentoCompraController.listaTodos);   
/** Visualiza Documento de Compra de PCE do Esportista */
router.get('/pce/:pce_id/compra/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoCompraController.visualiza);     
/** Exclui Documento de Compra de PCE do Esportista */
router.delete('/pce/:pce_id/compra/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoCompraController.exclui);
/** Download do arquivo do Documento de Compra de PCE do Esportista */
router.get('/pce/:pce_id/compra/:documento_id/download', 
    [AuthMiddleware.bearer], 
    DocumentoCompraController.download);

/** ****************** DOCUMENTO DE APOSTILAMENTO DO PCE ********************* */

/** Cria Documento de Apostilamento de PCE do Esportista */
router.post('/pce/:pce_id/apostilamento', 
    [AuthMiddleware.bearer], 
    DocumentoApostilamentoController.cria);
/** Atualiza Documento de Apostilamento de PCE do Esportista */
router.put('/pce/:pce_id/apostilamento/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoApostilamentoController.atualiza);
/** Lista Todos Documentos de Apostilamento de PCE do Esportista */
router.get('/pce/:pce_id/apostilamento/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    DocumentoApostilamentoController.listaTodos);   
/** Visualiza Documento de Apostilamento de PCE do Esportista */
router.get('/pce/:pce_id/apostilamento/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoApostilamentoController.visualiza);     
/** Exclui Documento de Apostilamento de PCE do Esportista */
router.delete('/pce/:pce_id/apostilamento/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoApostilamentoController.exclui);
/** Download do arquivo do Documento de Apostilamento de PCE do Esportista */
router.get('/pce/:pce_id/apostilamento/:documento_id/download', 
    [AuthMiddleware.bearer], 
    DocumentoApostilamentoController.download);    

module.exports = router;