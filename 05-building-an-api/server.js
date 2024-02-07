const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
// const listRoutes = require("./routes/api/lists");
// const todoRoutes = require("./routes/api/todos");

const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
// app.use(listRoutes);
// app.use(todoRoutes);
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

// local loopback address added to listen method
app.listen(PORT, "127.0.0.1", () => {
	console.log(`Server listening on port ${PORT}`);
});
