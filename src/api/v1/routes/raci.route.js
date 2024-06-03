const router = require('express').Router();
const raciController = require('../controllers/raci.controller');
const tokenMiddleware = require('../middleware/token.middleware');

router.route("/raci")
    .post(tokenMiddleware.verifyToken, raciController.create)
    .delete(tokenMiddleware.verifyToken, raciController.delete)
    .put(tokenMiddleware.verifyToken, raciController.update)
    .get(tokenMiddleware.verifyToken, raciController.list);

module.exports = router;