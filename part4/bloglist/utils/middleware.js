const logger = require("../utils/logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "unknown endpoint"});
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  logger.error(error.message);
  if (error.message.includes("`username` to be unique")) {
    return response.status(400).json({ error: "username taken" });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).end();
  }
  
  
  next(error);
};

const tokenExtractor = (request,response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};