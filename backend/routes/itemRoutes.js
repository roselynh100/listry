const express = require("express");
const router = express.Router();
const { submitList } = require("../controllers/itemController");

router.post("/", submitList);

module.exports = router;
