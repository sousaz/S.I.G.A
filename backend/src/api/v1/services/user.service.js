const User = require('../models/User');

module.exports = {
    async getUserByUsername(username) {
        return User.findOne({ username });
    },

    async getRoleById(id){
        return User.findById(id).select('role');
    }
}
