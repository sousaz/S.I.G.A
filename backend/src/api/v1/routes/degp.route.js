const router = require('express').Router();
const degpController = require('../controllers/degp.controller');
const tokenMiddleware = require('../middleware/token.middleware');

router.route("/degp")
    .post(tokenMiddleware.verifyToken, degpController.create)
    .put(tokenMiddleware.verifyToken, degpController.update)
    .get(tokenMiddleware.verifyToken, degpController.list)

router.route("/degp/:id").delete(tokenMiddleware.verifyToken, degpController.delete)

router.route("/degp/access").get(tokenMiddleware.verifyToken, degpController.listAccess)

module.exports = router;