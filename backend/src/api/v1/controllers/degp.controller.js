const degpService = require('../services/degp.service');
const accessService = require('../services/accessHistory.service');

module.exports = {
    async create(req, res) {
        const { username, name, cpf, password } = req.body;
        if (!username || !name || !cpf || !password)
            return res.status(400).json({error: 'username, nome, cpf e senha são obrigatórios'});
        try {
            await degpService.create(username, name, cpf, password);
            return res.status(201).json({ message: "Servidor  criado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar servidor', message: error.message });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'id é obrigatório'});
        try {
            await degpService.delete(id);
            return res.status(204).json({ message: "Servidor deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar servidor' });
        }
    },

    async update(req, res) {
        const { id, username, name, cpf } = req.body;
        if (!id || !username || !name || !cpf )
            return res.status(400).json({error: 'id, username, nome, cpf e senha são obrigatórios'});
        try {
            await degpService.update(id, username, name, cpf);
            return res.status(200).json({ message: "Servidor atualizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar servidor' });
        }
    },

    async list(req, res) {
        try {
            const employees = await degpService.list();
            return res.status(200).json({ employees });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar servidores', message: error.message });
        }
    },

    async listAccess(req, res) {
        try {
            const access = await accessService.listEmployeeAccess();
            return res.status(200).json({ access });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar acessos', message: error.message });
        }
    }
}