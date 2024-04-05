function asyncRouteHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      console.log(
        `ROUTE "${req.originalUrl}" EXECUTED IN ${
          Date.now() - res.locals.startTime
        }ms`
      );
    }
  };
}
function routeHandler(handler) {
  return (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      console.log(
        `ROUTE "${req.originalUrl}" EXECUTED IN ${
          Date.now() - res.locals.startTime
        }ms`
      );
    }
  };
}

function interceptor(req, res, next) {
  console.log(`ROUTE "${req.originalUrl}" INITIATED`);
  res.locals.startTime = Date.now();
  next();
}

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { CustomError, asyncRouteHandler, routeHandler, interceptor };
