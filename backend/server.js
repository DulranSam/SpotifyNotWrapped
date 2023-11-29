const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const token = require("./routes/token");

app.use(express.json());
app.use(cors());
app.use("/token", token);

app.listen(port, console.log(`Servers up on port ${port}`));
