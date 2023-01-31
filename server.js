"use strict";

const http = require("http");
const debug = require("debug")("nodestr:server");
const express = require("express");

const app = express();
const port = 3000;

const server = http.createServer(app);
const router = express.Router();

var route = router.get("/", (request, response, next) => {
  response.status(200).send({
    title: "Node Store API",
    version: "0.0.1",
  });
});

app.use("/", route);

server.listen(port);
console.log("API RODANDO NA PORTA:", port);
