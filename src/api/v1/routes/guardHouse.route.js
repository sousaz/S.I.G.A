const router = require('express').Router();
const guardHouseController = require('../controllers/guardHouse.controller');
const tokenMiddleware = require('../middleware/token.middleware');


router.route("/temporaryAccess")
    .post(tokenMiddleware.verifyToken, guardHouseController.createTemporaryAccess)
    .delete(tokenMiddleware.verifyToken, guardHouseController.removeTemporaryAccess)
    .get(tokenMiddleware.verifyToken, guardHouseController.listTemporaryAccess)

module.exports = router;