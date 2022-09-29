const { Router } = require('express');
const UsuarioController = require('../controllers/usuario-controller');

const router = Router();

/** Register a new User */
router.post('/usuario/registrar', UsuarioController.registrar);
/** Login an existing User */
router.post('/usuario/login', UsuarioController.login);
/** Destroy the User access token */
router.post('/usuario/logout', UsuarioController.logout);

module.exports = router;