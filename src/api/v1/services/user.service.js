const User = require('../models/user');

module.exports = {
    async getUserByUsername(username) {
        return User.findOne({ username });
    }
}
