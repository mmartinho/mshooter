const jwt = require('jsonwebtoken');

class AuthMiddleware {
    static verifyToken(req, res, next) {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
    
        if (!token) {
            return res.status(403).json({ message: 'Um token é necessário para a autenticação'});
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        return next();        
    }
}

module.exports = AuthMiddleware;