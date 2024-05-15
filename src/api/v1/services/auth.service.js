const brcypt = require('bcrypt');
const userService = require('./user.service');

module.exports = {
    async login(username, password) {
        const user = await userService.getUserByUsername(username);
        if(!user)
            return null;
        const checkPass = brcypt.compare(password, user.password)
        if(!user || !checkPass)
            return null;
        return { id: user._id, username: user.username, role: user.role }
    }
}