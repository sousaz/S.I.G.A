const authRoutes = require('./auth.route');
const express = require('express');
const router = express.Router();
const tokenService = require('../services/token.service');

router.use(authRoutes);



module.exports = router;