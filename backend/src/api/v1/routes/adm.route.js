const router = require('express').Router();
const admController = require('../controllers/adm.controller');
const tokenMiddleware = require('../middleware/token.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.route("/adm")
    .post(tokenMiddleware.verifyToken, roleMiddleware.isAdmin, admController.create)
    .put(tokenMiddleware.verifyToken, roleMiddleware.isAdmin, admController.update)
    .get(tokenMiddleware.verifyToken, roleMiddleware.isAdmin, admController.list);

router.route("/adm/:id").delete(tokenMiddleware.verifyToken, roleMiddleware.isAdmin, admController.delete)

module.exports = router;