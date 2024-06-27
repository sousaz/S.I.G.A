const router = require('express').Router();
const guardHouseController = require('../controllers/guardHouse.controller');
const tokenMiddleware = require('../middleware/token.middleware');


router.route("/temporaryAccess")
    .post(tokenMiddleware.verifyToken, guardHouseController.createTemporaryAccess)
    .get(tokenMiddleware.verifyToken, guardHouseController.listTemporaryAccess)
    
router.route("/temporaryAccess/:id").delete(tokenMiddleware.verifyToken, guardHouseController.removeTemporaryAccess)

module.exports = router;