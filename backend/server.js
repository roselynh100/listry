const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// Allows usage of body parameters from http req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/fetch", require("./routes/itemRoutes"));

app.get("/testing", (req, res) => {
	res.send("Output testing");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
