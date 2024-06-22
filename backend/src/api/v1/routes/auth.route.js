const authController = require('../controllers/auth.controller');
const tokenMiddleware = require('../middleware/token.middleware');

const router = require('express').Router();

router.route('/login').post(authController.login);
router.route('/accessEntry').post(tokenMiddleware.verifyToken, authController.accessEntry)

module.exports = router;