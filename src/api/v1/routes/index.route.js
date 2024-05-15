const authRoutes = require('./auth.route');
const express = require('express');
const router = express.Router();
const tokenMiddleware = require('../middleware/token.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.use(authRoutes);



module.exports = router;