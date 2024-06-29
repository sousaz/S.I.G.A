const router = require('express').Router();
const guardHouseController = require('../controllers/guardHouse.controller');
const tokenMiddleware = require('../middleware/token.middleware');
const roleMiddleware = require('../middleware/role.middleware');


router.route("/temporaryAccess")
    .post(tokenMiddleware.verifyToken, roleMiddleware.isGuardHouse, guardHouseController.createTemporaryAccess)
    .get(tokenMiddleware.verifyToken, roleMiddleware.isGuardHouse, guardHouseController.listVisitors)
    
router.route("/temporaryAccess/printout").post(tokenMiddleware.verifyToken, roleMiddleware.isGuardHouse, guardHouseController.getToken)
router.route("/temporaryAccess/access").get(tokenMiddleware.verifyToken, roleMiddleware.isGuardHouse, guardHouseController.listTemporaryAccess)


module.exports = router;