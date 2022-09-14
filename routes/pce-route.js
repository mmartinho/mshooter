const { Router } = require('express');
const PCEController = require('../controllers/pce-controller');

const router = Router();

/** 
 * All PCE routes 
 */

/** List all PCEs */
router.get('/pce', PCEController.PCEs);
/** Get a single PCE */
router.get('/pce/:id', PCEController.PCE);
/** Create a single PCE object */
router.post('/pce', PCEController.criaPCE);
/** Update a single PCE object */
router.put('/pce/:id', PCEController.atualizaPCE);
/** Delete a single PCE object */
router.delete('/pce/:id', PCEController.apagaPCE);
//router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula);
//router.post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula);
//router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula);
//router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.apagaMatricula);

module.exports = router;