const router = require('express').Router();
const admController = require('../controllers/adm.controller');
const tokenMiddleware = require('../middleware/token.middleware');

router.route("/adm")
    .post(tokenMiddleware.verifyToken, admController.create)
    .delete(tokenMiddleware.verifyToken, admController.delete)
    .put(tokenMiddleware.verifyToken, admController.update)
    .get(tokenMiddleware.verifyToken, admController.list);

module.exports = router;