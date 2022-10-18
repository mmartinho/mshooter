const { Router } = require('express');
const UsuarioController = require('../controllers/usuario-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');

const router = Router();

/** Register yourself as new User */
router.post('/usuario/registrar', [], UsuarioController.registrar);
/** Check user using e-mail, if it is a real user */
router.get('/usuario/verifica/:token', [AuthMiddleware.verificacaoEmail], UsuarioController.verifica);
/** Create a new User */
router.post('/usuario', [AuthMiddleware.bearer], UsuarioController.criar);
/** Update an existing User */
router.put('/usuario/:id', [AuthMiddleware.bearer], UsuarioController.atualizar);
/** Delete an existing User */
router.delete('/usuario/:id', [AuthMiddleware.bearer], UsuarioController.excluir);
/** Login an existing User */
router.post('/usuario/login', [AuthMiddleware.local], UsuarioController.login);
/** Destroy the User access token */
router.post('/usuario/logout', [AuthMiddleware.refresh, AuthMiddleware.bearer] , UsuarioController.logout);
/** Update the refresh token and re-login user */
router.post('/usuario/atualizatoken', [AuthMiddleware.refresh], UsuarioController.login);

module.exports = router;