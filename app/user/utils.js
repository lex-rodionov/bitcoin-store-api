const logger = require('../services/logger');

function returnUserNotFound(response) {
  returnError(response, 'User Not Found', 404);
}

function returnError(response, message, code = 400) {
  logger.logError(message);
  response.status(code).json({message});
}

function returnResponse(response, data) {
  logger.logResponse(data);
  response.send(data);
}

module.exports = {
  returnUserNotFound,
  returnError,
  returnResponse,
};