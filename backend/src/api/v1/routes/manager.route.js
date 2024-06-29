const router = require('express').Router();
const managerController = require('../controllers/manager.controller');
const tokenMiddleware = require('../middleware/token.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.route("/manager")
    .get(tokenMiddleware.verifyToken, roleMiddleware.isManangement, managerController.list);

module.exports = router;