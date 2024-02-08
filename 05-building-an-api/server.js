const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/frontend"));
// app.use("/api", require("./routes/api/documentation"));
app.use("/api/user", require("./routes/api/users"));
const listRoutes = require("./routes/api/lists");
app.use("/api/list", listRoutes);

function split(thing) {
	if (typeof thing === "string") {
		return thing.split("/");
	} else if (thing.fast_slash) {
		return "";
	} else {
		var match = thing
			.toString()
			.replace("\\/?", "")
			.replace("(?=\\/|$)", "$")
			.match(
				/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//
			);
		return match
			? match[1].replace(/\\(.)/g, "$1").split("/")
			: "<complex:" + thing.toString() + ">";
	}
}


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
