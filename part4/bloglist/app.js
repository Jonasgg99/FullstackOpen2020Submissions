const config = require("./utils/config");
const express = require("express");
require('express-async-errors');
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
app.use(middleware.tokenExtractor);
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");


morgan.token("text", function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :text :date[web]"));
logger.info("Connecting to MongoDB...");
//Connecting to server
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

