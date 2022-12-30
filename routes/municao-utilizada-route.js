const { Router } = require('express');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const DocumentoHabitualidadeController = require('../controllers/documento-habitualidade-controller');

const router = Router();

/** ***** MUNICAO UTILIZADA (Vide @see routes\local-route.js) ******* */

/** ******* HABITUALIDADE (Documento que certifica a Munição Utilizada pelo Esportista) ********* */

/** Lista paginada de todas as Habitualidades de Munição Utilizada registradas pelo Esportista */
router.get('/municaoutilizada/:municaoutilizada_id/habitualidade/paginada/:offset/:limit', 
    [AuthMiddleware.bearer], 
    DocumentoHabitualidadeController.lista);
/** Uma Habitualidade de Munição Utilizada registrada pelo Esportista */
router.get('/municaoutilizada/:municaoutilizada_id/habitualidade/:habitualidade_id', 
    [AuthMiddleware.bearer], 
    DocumentoHabitualidadeController.mostra);
/** Faz upload de Documento de Registro de Habitualidade de Munição Utilizada pelo Esportista */
router.post('/municaoutilizada/:municaoutilizada_id/habitualidade/upload', 
    [AuthMiddleware.bearer], 
    DocumentoHabitualidadeController.envia);
/** Faz donwload do Documento de Registro de Habitualidade de Munição Utilizada pelo Esportista */
router.get('/municaoutilizada/:municaoutilizada_id/documento/:documento_id/habitualidade/download', 
    [AuthMiddleware.bearer], 
    DocumentoHabitualidadeController.download);    
/** Associa Documento de Registro de Habitualidade à Munição Utilizada pelo Esportista */
router.put('/municaoutilizada/:municaoutilizada_id/documento/:documento_id/habitualidade', 
    [AuthMiddleware.bearer], 
    DocumentoHabitualidadeController.associa);
/** Exclui um registro de Habitualidade de Munição Utilizada pelo Esportista */
router.delete('/municaoutilizada/:municaoutilizada_id/habitualidade/:habitualidade_id', 
    [AuthMiddleware.bearer], 
    DocumentoHabitualidadeController.exclui);

module.exports = router;