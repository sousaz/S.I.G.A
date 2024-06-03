const authRoutes = require('./auth.route');
const guardHouseRoutes = require('./guardHouse.route');
const raciRoutes = require('./raci.route');
const degpRoutes = require('./degp.route');
const managerRoutes = require('./manager.route');
const express = require('express');
const router = express.Router();

router.use(authRoutes)
router.use(guardHouseRoutes)
router.use(raciRoutes)
router.use(degpRoutes)
router.use(managerRoutes)


module.exports = router;