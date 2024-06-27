const mg = require('mongoose');

const UserSchema = new mg.Schema({
    username: { type: String, unique: true},
    name: String,
    cpf: String,
    password: String,
    course: String,
    role: String
});


const User = mg.model('User', UserSchema)

module.exports = User;