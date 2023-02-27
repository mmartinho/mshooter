const { Router } = require('express');

const RecargaController = require('../../controllers/movimentacoes/recarga-controller');

const AuthStrategies = require('../../middleware/estrategias-passport');
const AuthMiddleware = require('../../middleware/auth');
const PrecheckMiddleware = require('../../middleware/precheck');

const router = Router();

/** Lista paginada de Movimentações para recarga da Munição em data */
router.get('/movimentacao/recarga/municao/:municao_id/paginada/:offset/:limit', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    RecargaController.lista);
/** Registra Movimentação de saída de Insumos para entrada da Munição em data */
router.post('/movimentacao/recarga/municao/:municao_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    RecargaController.cria);
/** Exclui as Movimentações de Insumos e da Munição em data */
router.delete('/movimentacao/recarga/municao/:municao_id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    RecargaController.exclui);  

module.exports = router;    