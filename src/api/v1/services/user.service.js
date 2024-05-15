const User = require('../models/user');

module.exports = {
    async getUserByUsername(username) {
        return User.findOne({ username });
    },

    async getRoleById(id){
        return User.findById(id).select('role');
    }
}
