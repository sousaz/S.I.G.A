const User = require('../models/User')
const accessHistoryService = require('./accessHistory.service')

module.exports = {
    async createTemporaryAccess(user){
        try {
            const username = `visitante_${user.cpf}`
            const userExists = await User.findOne({ name: user.name, cpf: user.cpf, role: "VISITANTE" })
            if(userExists) return false
            const newUser = new User({ username: username, name: user.name, cpf: user.cpf, role: "VISITANTE" })
            await newUser.save()
            return true
        } catch(error){
            console.log(error)
            return false
        }
    },

    async removeTemporaryAccess(userId){
        if(!userId)
            return false;
        const access = await accessHistoryService.removeTemporaryAccess(userId)
        if(!access)
            return false;
        return true
    },

    async listTemporaryAccess(){
        return await accessHistoryService.listTemporaryAccess() || false
    },

    async getUserById(userId){
        return await User.findById(userId) || false
    },

    async listVisitors(){
        return await User.find({ role: "VISITANTE" }) || false
    }

}