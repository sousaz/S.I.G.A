const guardHouseService = require('../services/guardHouse.service');
const tokenService = require('../services/token.service');
const { list } = require('./degp.controller');

module.exports = {
    async createTemporaryAccess(req, res){
        const { name, cpf } = req.body
        if(!name || !cpf)
            return res.status(400).json({ message: "Dados inválidos" })
        const user = { name, cpf }
        const result = await guardHouseService.createTemporaryAccess(user)
        if(!result)
            return res.status(500).json({ message: "Erro ao criar acesso temporário" })
        return res.status(201).json({ message: "Acesso temporário criado com sucesso" })
    },

    async removeTemporaryAccess(req, res){
        const id = req.params.id
        if(!id)
            return res.status(400).json({ message: "Dados inválidos" })
        const result = await guardHouseService.removeTemporaryAccess(id)
        if(!result)
            return res.status(500).json({ message: "Erro ao remover acesso temporário" })
        return res.status(204).json({ message: "Acesso temporário remover com sucesso" })
    },

    async listTemporaryAccess(req, res){
        const listOfAccess = await guardHouseService.listTemporaryAccess()
        if(!listOfAccess)
            res.status(500).json({ message: "Erro ao listar acessos temporários" })
        res.status(200).json({ access: listOfAccess })
    },

    async getToken(req, res){
        const { userId } = req.body
        if(!userId)
            return res.status(400).json({ message: "userId é obrigatório" })
        const user = await guardHouseService.getUserById(userId)
        if(!user)
            return res.status(500).json({ message: "Erro ao buscar usuário" })
        const token = await tokenService.generateToken(user._id, user.role, "6h")
        if(!token)
            return res.status(500).json({ message: "Erro ao gerar token" })
        return res.status(200).json({ userId: user._id, token: token })
    },

    async listVisitors(req, res){
        const listOfVisitors = await guardHouseService.listVisitors()
        if(!listOfVisitors)
            return res.status(500).json({ message: "Erro ao listar visitantes" })
        return res.status(200).json({ visitors: listOfVisitors })
    }
}