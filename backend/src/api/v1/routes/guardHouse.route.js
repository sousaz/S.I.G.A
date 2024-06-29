const router = require('express').Router();
const guardHouseController = require('../controllers/guardHouse.controller');
const tokenMiddleware = require('../middleware/token.middleware');


router.route("/temporaryAccess")
    .post(tokenMiddleware.verifyToken, guardHouseController.createTemporaryAccess)
    .get(tokenMiddleware.verifyToken, guardHouseController.listVisitors)
    
router.route("/temporaryAccess/printout").post(tokenMiddleware.verifyToken, guardHouseController.getToken)
router.route("/temporaryAccess/access").get(tokenMiddleware.verifyToken, guardHouseController.listTemporaryAccess)


module.exports = router;