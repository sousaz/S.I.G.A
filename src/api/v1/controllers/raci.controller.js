const raciService = require('../services/raci.service');

module.exports = {
    async create(req, res) {
        const { username, name, cpf, password, course } = req.body;
        if (!username || !name || !cpf || !password || !course)
            return res.status(400).json({error: 'username, nome, cpf, senha e curso são obrigatórios'});
        try {
            await raciService.create(username, name, cpf, password, course);
            return res.status(201).json({ message: "Aluno criado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar aluno', message: error.message });
        }
    },

    async delete(req, res) {
        const { id } = req.body;
        if (!id)
            return res.status(400).json({error: 'username é obrigatório'});
        try {
            await raciService.delete(id);
            return res.status(204).json({ message: "Aluno deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar aluno', message: error.message });
        }
    },

    async update(req, res) {
        const { id, username, name, cpf, course } = req.body;
        if (!id || !username || !name || !cpf || !course)
            return res.status(400).json({error: 'id, username, nome, cpf, senha e curso são obrigatórios'});
        try {
            await raciService.update(id, username, name, cpf, course);
            return res.status(200).json({ message: "Aluno atualizado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar aluno', message: error.message });
        }
    },

    async list(req, res) {
        try {
            const students = await raciService.list();
            return res.status(200).json({ students });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar alunos', message: error.message });
        }
    }
}