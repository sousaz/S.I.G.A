const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    async generateToken(userId, role, expiresIn){
        const payload = { 
            userId,
            role,
        };
        return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: expiresIn || "1d" });
    },

    async verifyToken(token){
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}