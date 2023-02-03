"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Connecting with Database:
mongoose.connect(
  "mongodb+srv://imperinhos:75220821@cluster0.aodbffs.mongodb.net/test"
);

// Loading Models:
const Product = require("./models/product");

// Loading Routes:
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
