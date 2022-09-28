const { Router } = require('express');
const AuthMiddleware = require('../middleware/auth');
const WelcomeController = require('../controllers/welcome-controller');

const router = Router();

router.post('/welcome', AuthMiddleware.verifyToken, WelcomeController.sayHello);

module.exports = router;