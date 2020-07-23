const express = require("express");
const app = express();
const port = 3000;
const indexRoute = require("./routes/index");
const vocabRoute = require("./routes/vocab");
var bodyParser = require("body-parser");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("static"));
app.set("view engine", "ejs");
//route middlewares
app.use("/", indexRoute);
app.use("/api", vocabRoute);

app.listen(port, () => console.log(`Server is Up and Running`));
