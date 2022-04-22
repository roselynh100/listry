const express = require("express");
const router = express.Router();
const { submitList } = require("../controllers/itemController");

router.get("/", submitList);

module.exports = router;
