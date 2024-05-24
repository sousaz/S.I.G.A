const authRoutes = require('./auth.route');
const guardHouseRoutes = require('./guardHouse.route');
const express = require('express');
const router = express.Router();

router.use(authRoutes)
router.use(guardHouseRoutes)



module.exports = router;