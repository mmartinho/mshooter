const { Router } = require('express');
const InsumoController = require('../controllers/insumo-controller');
const InsumoMovimentacaoController = require('../controllers/insumo-molvimentacao-controller');
const InsumoMovimentacaoDocumentoController = require('../controllers/documento-insumo-movimentacao-controller');

const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** ******************** CRUD DE INSUMO ********************* */

/** Lista paginada de todos os insumos do Esportista */
router.get('/insumo/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    InsumoController.listAll);
/** Um Insumo específico do Esportista */
router.get('/insumo/:id', 
    [AuthMiddleware.bearer], 
    InsumoController.singleObject);
/** Cria um novo objeto de Insumo de Esportista */
router.post('/insumo', 
    [AuthMiddleware.bearer], 
    InsumoController.cria);
/** Atualiza um objeto de Insumo de Esportista específico */
router.put('/insumo/:id', 
    [AuthMiddleware.bearer], 
    InsumoController.atualiza);
/** Exclui um objeto de Insumo de Esportista específico */
router.delete('/insumo/:id', 
    [AuthMiddleware.bearer], 
    InsumoController.exclui);

/** **************************************** CRUD DE MOVIMENTACAO DE INSUMO ************************************* */

/** Lista paginada de todas as Movimentações de Insumos de uma determinada Munição registradas pelo Esportista */
router.get('/insumo/:insumo_id/municao/:municao_id/insumomovimentacao/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoController.lista);   
/** Um Movimentação  de Insumo registrado pelo Esportista */
router.get('/insumo/:insumo_id/municao/:municao_id/insumomovimentacao/:insumomovimentacao_id', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoController.mostra);
/** Registra Movimentação de Insumo  de Esportista */
router.post('/insumo/:insumo_id/municao/:municao_id/insumomovimentacao',            
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoController.cria);
/** Atualiza o registro de Movimentação de Insumo de Esportista */
router.put('/insumo/:insumo_id/municao/:municao_id/insumomovimentacao/:insumomovimentacao_id', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoController.atualiza);
/** Exclui um registro de Movimentação de Insumo de Esportista */
router.delete('/insumo/:insumo_id/municao/:municao_id/insumomovimentacao/:insumomovimentacao_id', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoController.exclui);

/** ****************************** CRUD DE DOCUMENTO DE MOVIMENTACAO DE INSUMO ************************************* */

/** Lista paginada dos Documentos de Movimentação de Insumo do Esportista */
router.get('/insumomovimentacao/:insumomovimentacao_id/insumomovimentacaodocumento/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoDocumentoController.lista);
/** Mostra Documento de Movimentação de Insumo do Esportista */
router.get('/insumomovimentacao/:insumomovimentacao_id/insumomovimentacaodocumento/documento/:documento_id', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoDocumentoController.mostra);    
/** Cria Documento de Movimentação de Insumo de Esportista */
router.post('/insumomovimentacao/:insumomovimentacao_id/insumomovimentacaodocumento', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoDocumentoController.cria);
/** Atualiza arquivo do Documento de Movimentação de Insumo do Esportista */
router.put('/insumomovimentacao/:insumomovimentacao_id/insumomovimentacaodocumento/documento/:documento_id', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoDocumentoController.atualiza);
/** Download do arquivo do Documento de Movimentação de Insumo do Esportista */
router.get('/insumomovimentacao/:insumomovimentacao_id/insumomovimentacaodocumento/documento/:documento_id/download', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoDocumentoController.download); 
/** Exclui Documento de Movimentação de Insumo do Esportista */
router.delete('/insumomovimentacao/:insumomovimentacao_id/insumomovimentacaodocumento/documento/:documento_id', 
    [AuthMiddleware.bearer], 
    InsumoMovimentacaoDocumentoController.exclui);          

module.exports = router;