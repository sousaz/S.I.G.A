const router = require('express').Router();
const raciController = require('../controllers/raci.controller');
const tokenMiddleware = require('../middleware/token.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.route("/raci")
    .post(tokenMiddleware.verifyToken, roleMiddleware.isRaci, raciController.create)
    .put(tokenMiddleware.verifyToken, roleMiddleware.isRaci, raciController.update)
    .get(tokenMiddleware.verifyToken, roleMiddleware.isRaci, raciController.list)

router.route("/raci/:id").delete(tokenMiddleware.verifyToken, roleMiddleware.isRaci, raciController.delete)

router.route("/raci/access").get(tokenMiddleware.verifyToken, roleMiddleware.isRaci, raciController.listAccess);

module.exports = router;