const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

module.exports = {
    async isRaci(req, res, next){
        const token = jwt.decode(req.token);
        const userRole = await userService.getRoleById(token.payload.userId);
        return userRole.role === 'RACI' ? next() : res.status(403).json({ message: 'Você não tem permissão para acessar essa rota' });
    },

    async isDEGP(req, res, next){
        const token = jwt.decode(req.token);
        const userRole = await userService.getRoleById(token.payload.userId);
        return userRole.role === 'DEGP' ? next() : res.status(403).json({ message: 'Você não tem permissão para acessar essa rota' });
    },

    async isManangement(req, res, next){
        const token = jwt.decode(req.token);
        const userRole = await userService.getRoleById(token.payload.userId);
        return userRole.role === 'GESTAO' ? next() : res.status(403).json({ message: 'Você não tem permissão para acessar essa rota' });
    },

    async isAdmin(req, res, next){
        const token = jwt.decode(req.token);
        const userRole = await userService.getRoleById(token.payload.userId);
        return userRole.role === 'ADMIN' ? next() : res.status(403).json({ message: 'Você não tem permissão para acessar essa rota' });
    },

    async isGuardHouse(req, res, next){
        const token = jwt.decode(req.token);
        const userRole = await userService.getRoleById(token.payload.userId);
        return userRole.role === 'SEGURANCA' ? next() : res.status(403).json({ message: 'Você não tem permissão para acessar essa rota' });
    }
}