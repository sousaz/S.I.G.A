const AccessHistory = require('../services/accessHistory.service');

module.exports = {
    async list(req, res) {
        try {
            const access = await AccessHistory.listAllAccess();
            return res.status(200).json({ access });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao acessar', message: error.message });
        }
    }
}