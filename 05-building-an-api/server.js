const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const apiRoutes = require("./routes/api");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
