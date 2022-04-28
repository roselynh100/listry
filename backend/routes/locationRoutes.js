const express = require("express");
const router = express.Router();
const { getCoords } = require("../controllers/locationController");

router.post("/", getCoords)

module.exports = router;