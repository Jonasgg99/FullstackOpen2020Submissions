const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs")

morgan.token("text", function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :text :date[web]"));
console.log("Connecting to MongoDB...");
//Connecting to server
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
