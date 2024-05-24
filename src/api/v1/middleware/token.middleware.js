const tokenService = require('../services/token.service');

module.exports = {
    async verifyToken(req, res, next){
          const auth = req.headers["authorization"];
          if(!auth) return res.status(401).json({ message: 'Token não informado' });
          const token = auth.split(' ')[1];
          try {
               await tokenService.verifyToken(token)
               req.token = token;
               next();
          } catch (error) {
               res.status(401).json({ message: 'Token inválido' });
          }
    }
}