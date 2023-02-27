const { Router } = require('express');

const MovimentacaoDocumentoController = require('../../controllers/movimentacoes/movimentacao-documento-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** Lista paginada dos Documentos de Movimentação */
router.get('/movimentacao/:movimentacao_id/documento/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    MovimentacaoDocumentoController.lista);
/** Mostra Documento de Movimentação */
router.get('/movimentacao/:movimentacao_id/documento/:documento_id', 
    [AuthMiddleware.bearer], 
    MovimentacaoDocumentoController.mostra);    
/** Cria Documento de Movimentação */
router.post('/movimentacao/:movimentacao_id/documento', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MovimentacaoDocumentoController.cria);
/** Atualiza arquivo do Documento de Movimentação */
router.put('/movimentacao/:movimentacao_id/documento/:documento_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MovimentacaoDocumentoController.atualiza);
/** Download do arquivo do Documento de Movimentação */
router.get('/movimentacao/:movimentacao_id/documento/:documento_id/download', 
    [AuthMiddleware.bearer], 
    MovimentacaoDocumentoController.download); 
/** Exclui Documento de Movimentação */
router.delete('/movimentacao/:movimentacao_id/documento/:documento_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    MovimentacaoDocumentoController.exclui);

module.exports = router;