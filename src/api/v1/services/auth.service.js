const brcypt = require('bcrypt');
const userService = require('./user.service');
const accessHistoryService = require('./accessHistory.service');

module.exports = {
    async login(username, password) {
        const user = await userService.getUserByUsername(username);
        if(!user)
            return null;
        const checkPass = await brcypt.compare(password, user.password)
        if(!user || !checkPass)
            return null;
        return { id: user._id, username: user.username, role: user.role }
    },
    
    async accessEntry(userId){
        try {
            await accessHistoryService.createNewAccess(userId);
            return true
        } catch(error){
            console.log(error)
            return false
        }
    }
}