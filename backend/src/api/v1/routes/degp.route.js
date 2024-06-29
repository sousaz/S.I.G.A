const router = require('express').Router();
const degpController = require('../controllers/degp.controller');
const tokenMiddleware = require('../middleware/token.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.route("/degp")
    .post(tokenMiddleware.verifyToken, roleMiddleware.isDEGP, degpController.create)
    .put(tokenMiddleware.verifyToken, roleMiddleware.isDEGP, degpController.update)
    .get(tokenMiddleware.verifyToken, roleMiddleware.isDEGP, degpController.list)

router.route("/degp/:id").delete(tokenMiddleware.verifyToken, roleMiddleware.isDEGP, degpController.delete)

router.route("/degp/access").get(tokenMiddleware.verifyToken, roleMiddleware.isDEGP, degpController.listAccess)

module.exports = router;