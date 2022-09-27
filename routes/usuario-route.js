const { Router } = require('express');
const UsuarioController = require('../controllers/usuario-controller');

const router = Router();

/** Register a new User */
router.post('/usuario/registrar', UsuarioController.registrar);
/** Login an existing User */
router.post('/usuario/login', UsuarioController.login);

module.exports = router;