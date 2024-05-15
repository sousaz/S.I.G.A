const authService = require('../services/auth.service');
const authToken = require('../services/token.service');

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({error: 'username e senha são obrigatórios'});
        const user = await authService.login(username, password);
        if (!user)
            return res.status(401).json({error: 'Usuário ou senha inválidos'});
        const token = await authToken.generateToken(user.id, "1d");
        return res.status(200).json({ user, token });
    }
}