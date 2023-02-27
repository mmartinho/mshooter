const { Router } = require('express');
const UsuarioController = require('../controllers/usuario-controller');
const AuthStrategies = require('../middleware/estrategias-passport');
const AuthMiddleware = require('../middleware/auth');
const PrecheckMiddleware = require('../middleware/precheck');

const router = Router();

/** Registrar-se como um novo usuário */
router.post('/usuario/registrar', 
    [PrecheckMiddleware.verificacaoBody], 
    UsuarioController.registrar);
/** Confirmar registro de usuario */
router.get('/usuario/verifica/:token', 
    [AuthMiddleware.verificacaoEmail], 
    UsuarioController.verifica);
/** Login de usuário existente */
router.post('/usuario/login', 
    [AuthMiddleware.local], 
    UsuarioController.login);    
/** Atualiza token */
router.post('/usuario/atualizatoken', 
    [AuthMiddleware.refresh], 
    UsuarioController.login);    
/** Atualizar usuário existente */
router.put('/usuario/:id', 
    [AuthMiddleware.bearer], 
    UsuarioController.atualizar);
/** Cria novo usuário */
router.post('/usuario', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    UsuarioController.criar);
/** Excluir usuário existente */
router.delete('/usuario/:id', 
    [AuthMiddleware.bearer,PrecheckMiddleware.verificacaoBody], 
    UsuarioController.excluir);    
/** Logout de usuário */
router.post('/usuario/logout', 
    [AuthMiddleware.refresh, AuthMiddleware.bearer] , 
    UsuarioController.logout);


module.exports = router;