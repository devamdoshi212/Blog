function interceptor(req, res, next) {
  console.log(`ROUTE "${req.originalUrl}" INITIATED`);
  res.locals.startTime = Date.now();
  next();
}
module.exports = { interceptor };
