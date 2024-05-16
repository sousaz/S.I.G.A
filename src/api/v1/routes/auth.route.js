const authController = require('../controller/auth.controller');

const router = require('express').Router();

router.route('/login').post(authController.login);
router.route('/accessEntry').post(authController.accessEntry)

module.exports = router;