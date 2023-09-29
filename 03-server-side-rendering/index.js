const express = require("express");
const app = express();
const path = require("path")
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use("^/$|/index(.html)?", require("./routes/root"))
// app.use("/todos", require("./routes/api/todolists"))
// app.use("/users", require("./routes/api/users"))

app.listen(port, () => {
  console.log(`Server Side Rendering app listening on port ${port}`);
});
