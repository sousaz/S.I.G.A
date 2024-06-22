const guardHouseService = require('../services/guardHouse.service');

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
        const { id } = req.body
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
    }
}