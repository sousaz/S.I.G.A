const router = require('express').Router();
const degpController = require('../controllers/degp.controller');
const tokenMiddleware = require('../middleware/token.middleware');

router.route("/degp")
    .post(tokenMiddleware.verifyToken, degpController.create)
    .delete(tokenMiddleware.verifyToken, degpController.delete)
    .put(tokenMiddleware.verifyToken, degpController.update)
    .get(tokenMiddleware.verifyToken, degpController.list);

module.exports = router;