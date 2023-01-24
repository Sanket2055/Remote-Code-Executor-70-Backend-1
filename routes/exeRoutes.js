const router = require("express").Router();
const exeController = require("../controllers/exeController");

router.post("/exe-cpp", exeController.executeCPP);

router.post("/exe-js", exeController.executeJS);

router.post("/exe-py", exeController.executePY);

module.exports = router;
