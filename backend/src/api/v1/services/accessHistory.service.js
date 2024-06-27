const AccessHistory = require('../models/AccessHistory');

module.exports = {
    async createNewAccess(userId, timestamp){
        const access = await AccessHistory.findOne({ user: userId }).sort({ date: -1 });
        const newAccess = new AccessHistory({ date: timestamp || Date.now(), isinside: true, user: userId })
        if(!access)
            return await newAccess.save();
        newAccess.isinside = !access.isinside;
        newAccess.date = timestamp || Date.now();
        newAccess.user = userId;
        return await newAccess.save();
    },

    async createTemporaryAccess(userId){
        if(!userId)
            return false;
        const newAccess = new AccessHistory({ date: Date.now(), isinside: true, user: userId })
        return await newAccess.save();
    },

    async removeTemporaryAccess(userId){
        if(!userId)
            return false;
        const access = await AccessHistory.findOne({ user: userId }).sort({ date: -1 });
        if(!access)
            return false;
        const newAccess = new AccessHistory({ date: Date.now(), isinside: !access.isinside, user: userId })
        return await newAccess.save();
    },

    async listTemporaryAccess(){
        return await AccessHistory.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $match: { 'user.role': 'VISITANTE' }},
            { $project: { 'user.password': 0 }}
        ])
    },

    async listAllAccess(){
        return await AccessHistory.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $project: { 'user.password': 0 }}
        ])
    },

    async listStudentsAccess(){
        return await AccessHistory.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $match: { 'user.role': 'ALUNO' }},
            { $project: { 'user.password': 0 }}
        ])
    },

    async listEmployeeAccess(){
        return await AccessHistory.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $match: { 'user.role': 'SERVIDOR' }},
            { $project: { 'user.password': 0 }}
        ])
    },
    
}