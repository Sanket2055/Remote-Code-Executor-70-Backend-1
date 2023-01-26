const router = require("express").Router();
const exeController = require("../controllers/exeController");

router.post("/exe-cpp", exeController.executeCPP);

router.post("/exe-js", exeController.executeJS);

router.post("/exe-py", exeController.executePY);

router.post("/exe-c", exeController.executeC);

router.post("/exe-go", exeController.executeGO);

router.post("/exe-java", exeController.executeJAVA);

module.exports = router;
