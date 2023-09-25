const express = require("express");
const app = express();
const path = require("path")
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "./public")))

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.listen(port, () => {
  console.log(`Server Side Rendering app listening on port ${port}`);
});
