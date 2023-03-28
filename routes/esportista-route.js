const { Router } = require('express');
const EsportistaController = require('../controllers/esportista-controller');
const DocumentoRegistroController = require('../controllers/documento-registro-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const PrecheckMiddleware = require('../middleware/precheck');

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
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    EsportistaController.createObject);
/** Atualiza um Esportista específico */
router.put('/esportista/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    EsportistaController.updateObject);    
/** Exclui um Esportista específico */
router.delete('/esportista/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    EsportistaController.deleteObject);

/** ********************* DOCUMENTOS DE REGISTRO ********************** */   

/** Cria novo Documento de Registro de Esportista */
router.post('/esportista/registro', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    DocumentoRegistroController.cria);
/** Atualiza Documento de Registro de Esportista */
router.put('/esportista/registro/:documento_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    DocumentoRegistroController.atualiza);    
/** Lista paginada de todos os Documentos de Registro do Esportista */
router.get('/esportista/registro/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    DocumentoRegistroController.listaTodos);
/** Mostra Documento de Registro de Esportista em particular */
router.get('/esportista/registro/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoRegistroController.visualiza);    
/** Download do arquivo do Documento de Registro de Esportista */
router.get('/esportista/registro/:documento_id/download', 
    [AuthMiddleware.bearer], 
    DocumentoRegistroController.download);  
/** Download do arquivo do Documento de Registro de Esportista */
router.delete('/esportista/registro/:documento_id', 
    [AuthMiddleware.bearer], 
    DocumentoRegistroController.exclui);  
    
/** ************* OUTRAS ROTAS DE ESPORTISTA *********** */ 

/** Tipos enumerados de tipos de documento de registro de esportista */
router.get('/esportista/registro/tipos/tipo', 
    [AuthMiddleware.bearer], 
    DocumentoRegistroController.tipos);      

module.exports = router;