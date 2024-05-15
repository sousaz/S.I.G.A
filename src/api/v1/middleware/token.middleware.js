const tokenService = require('../services/token.service');

module.exports = {
    verifyToken(req, res, next){
        const { token } = req.body;
       try {
            tokenService.verifyToken(token);
            return next();
       } catch (error) {
            res.status(401).json({ message: 'Token inválido' });
       }
    }
}