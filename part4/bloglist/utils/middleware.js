const logger = require("../utils/logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"});
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'ValidationError') {
    return response.status(400).end();
  }
  
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};