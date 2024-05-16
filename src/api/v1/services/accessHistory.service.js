const AccessHistory = require('../models/AccessHistory');

module.exports = {
    async createNewAccess(userId){
        const access = await AccessHistory.findOne({ user: userId }).sort({ date: -1 });
        const newAccess = new AccessHistory({ date: Date.now(), isinside: true, user: userId })
        if(!access)
            return await newAccess.save();
        newAccess.isinside = !access.isinside;
        newAccess.date = Date.now();
        newAccess.user = userId;
        return await newAccess.save();
    },

    
}