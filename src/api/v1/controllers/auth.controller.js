const authService = require('../services/auth.service');
const tokenService = require('../services/token.service');
const accessHistoryService = require('../services/accessHistory.service');

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({error: 'username e senha são obrigatórios'});
        const user = await authService.login(username, password);
        if (!user)
            return res.status(401).json({error: 'Usuário ou senha inválidos'});
        const token = await tokenService.generateToken(user.id, "1d");
        if(!token)
            return res.status(500).json({error: 'Erro ao gerar token'});
        return res.status(200).json({ user, token });
    },

    async accessEntry(req, res){
        const { userId, token } = req.body
        if(!userId || !token)
            return res.status(400).json({error: 'userId e token são obrigatórios'});
        try {
            await Promise.all([
                tokenService.verifyToken(token),
                accessHistoryService.createNewAccess(userId)
            ])
            res.status(200).json({ message: "Acesso registrado com sucesso" })
        } catch (error) {
            res.status(401).json({ message: 'Acesso negado' });
        }
    }
}