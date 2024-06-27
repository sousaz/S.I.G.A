const admService = require('../services/adm.service');

module.exports = {
    async create(req, res) {
        const { username, name, cpf, password, role } = req.body;
        if (!username || !name || !cpf || !password || !role)
            return res.status(400).json({error: 'username, nome, cpf, senha e role são obrigatórios'});
        try {
            await admService.create(username, name, cpf, password, role.toUpperCase());
            return res.status(201).json({ message: "criado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar', message: error.message });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'id é obrigatório'});
        try {
            await admService.delete(id);
            return res.status(204).json({ message: "Deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar', message: error.message });
        }
    },

    async update(req, res) {
        const { id, username, name, cpf, role } = req.body;
        if (!id || !username || !name || !cpf || !role)
            return res.status(400).json({error: 'id, username, nome, cpf, senha e role são obrigatórios'});
        try {
            await admService.update(id, username, name, cpf, role.toUpperCase());
            return res.status(200).json({ message: "Atualizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar', message: error.message });
        }
    },

    async list(req, res) {
        try {
            const users = await admService.list();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar', message: error.message });
        }
    }
}