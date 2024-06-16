const User = require('../models/User');
const brcypt = require('bcrypt');

module.exports = {
    async create(username, name, cpf, password) {
        return await new User({ username, name, cpf, password: await brcypt.hash(password, await brcypt.genSalt(12)), role: 'SERVIDOR'}).save();
    },

    async delete(id) {
        const user = await User.findById(id);
        if (!user) throw new Error('Usuário não encontrado');
        user.role = 'SERVIDOR INATIVO';
        return await user.save();
    },

    async update(id, username, name, cpf) {
        const user = await User.findById(id);
        if (!user) throw new Error('Usuário não encontrado');
        user.username = username;
        user.name = name;
        user.cpf = cpf;
        return await user.save();
    },

    async list() {
        return await User.find({ role: 'SERVIDOR' }, {password: 0});
    }
}