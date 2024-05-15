const openai = require("openai").default;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const apiKey = process.env.API_TOKEN;
const openaiClient = new openai({ apiKey });

app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", function (socket) {
  socket.on("newuser", function (username) {
    console.log(username);
  });
});

server.listen(3000, () => console.log("Server berjalan di localhost:3000"));
