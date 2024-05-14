const mg = require('mongoose');

const User = mg.model('User', {
    username: String,
    name: String,
    cpf: String,
    password: String,
    course: String,
    role: String
})

module.exports = User;