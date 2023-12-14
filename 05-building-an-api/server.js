const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const apiRoutes = require("./routes/api/lists");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(apiRoutes);
// local loopback address added to listen method
app.listen(PORT, "127.0.0.1", () => {
	console.log(`Server listening on port ${PORT}`);
});
