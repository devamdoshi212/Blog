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

module.exports = { asyncRouteHandler, routeHandler };
