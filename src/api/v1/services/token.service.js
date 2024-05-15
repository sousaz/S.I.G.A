const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async generateToken(userId, expiresIn){
        const payload = { 
            userId,
        };
        return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: expiresIn || "1d" });
    },

    async verifyToken(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}