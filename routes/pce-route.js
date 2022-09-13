const { Router } = require('express');
const PCEController = require('../controllers/pce-controller');

const router = Router();

router.get('/pce', PCEController.PCEs);
//router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
//router.post('/pessoas', PessoaController.criaPessoa);
//router.put('/pessoas/:id', PessoaController.atualizaPessoa);
//router.delete('/pessoas/:id', PessoaController.apagaPessoa);
//router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula);
//router.post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula);
//router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula);
//router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.apagaMatricula);

module.exports = router;