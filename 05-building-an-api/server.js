const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const listRoutes = require("./routes/api/lists");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

app.use(listRoutes);
// local loopback address added to listen method
app.listen(PORT, "127.0.0.1", () => {
	console.log(`Server listening on port ${PORT}`);
});
