const router = require("express").Router();

router.use("/code", require("./exeRoutes"));

module.exports = router;
