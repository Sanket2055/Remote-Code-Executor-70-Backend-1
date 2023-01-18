const router = require("express").Router();
const exeController = require("../controllers/exeController");

router.post("/exe-cpp", exeController.executeCPP);

router.post("/exe-js", exeController.executeJS);

module.exports = router;
