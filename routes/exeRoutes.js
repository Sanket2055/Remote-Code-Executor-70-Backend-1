const router = require("express").Router();
const exeController = require("../controllers/exeController");

router.post("/exe-cpp", exeController.executeCpp);

router.post("/exe-javascript", exeController.executeJavaScript);

router.post("/exe-python", exeController.executePython);

router.post("/exe-c", exeController.executeC);

router.post("/exe-go", exeController.executeGo);

router.post("/exe-java", exeController.executeJava);

module.exports = router;
