function errorHandler(err, req, res, next) {
   let status = err.status || 500;
   let message = err.message;

   return res.status(status).json({
      error: {message, status}
   })
}

module.exports = {errorHandler}