const User = require('../models/User')
const accessHistoryService = require('./accessHistory.service')

module.exports = {
    async createTemporaryAccess(user){
        try {
            const newUser = new User({ name: user.name, cpf: user.cpf, role: "VISITANTE" })
            const createdUser = await newUser.save()
            await accessHistoryService.createTemporaryAccess(createdUser._id)
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
    }

}