const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

// Allows usage of body parameters from http req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/fetch", require("./routes/itemRoutes"));
app.use("/convert", require("./routes/locationRoutes"));

app.get("/testing", (req, res) => {
	res.send("Output testing");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
const whitelist = ["http://localhost:3000"];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));
app.use(cors());
