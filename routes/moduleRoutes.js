const express = require("express");
const router = express.Router();
const { addModuleToLevel } = require("../controllers/moduleController");

router.post("/add", addModuleToLevel);

module.exports = router;
