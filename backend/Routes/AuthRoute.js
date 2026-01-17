const { Signup,Login, Logout } = require("../Controllers/AuthController.js");
const router = require("express").Router();
const {userVerification} = require("../Middelwares/AuthMiddleware.js");

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/logout',Logout);
router.post('/',userVerification);

module.exports = router;