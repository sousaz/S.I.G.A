const User = require('../models/User');
const brcypt = require('bcrypt');

module.exports = {
    async create(username, name, cpf, password, course) {
        return await new User({ username, name, cpf, password: await brcypt.hash(password, await brcypt.genSalt(12)), course, role: 'ALUNO'}).save();
    },

    async delete(id) {
        const user = await User.findById(id);
        if (!user) throw new Error('Usuário não encontrado');
        user.role = 'INATIVO';
        return await user.save();
    },

    async update(id, username, name, cpf, course) {
        const user = await User.findById(id);
        if (!user) throw new Error('Usuário não encontrado');
        user.username = username;
        user.name = name;
        user.cpf = cpf;
        user.course = course;
        return await user.save();
    },

    async list() {
        return await User.find({ role: 'ALUNO' }, {password: 0});
    }
}