const authController = require('../controller/auth.controller');

const router = require('express').Router();

router.route('/login').post(authController.login);

module.exports = router;