const router = require('express').Router();
const managerController = require('../controllers/manager.controller');
const tokenMiddleware = require('../middleware/token.middleware');

router.route("/manager")
    .get(tokenMiddleware.verifyToken, managerController.list);

module.exports = router;