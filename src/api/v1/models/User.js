const mg = require('mongoose');

const UserSchema = new mg.Schema({
    username: { type: String, unique: true, index: true },
    name: String,
    cpf: String,
    password: String,
    course: String,
    role: String
});

UserSchema.index({ username: 1 }, { unique: true });

const User = mg.model('User', UserSchema)

module.exports = User;