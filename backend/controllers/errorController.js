const sendErrorDev = (error, res) => {
  res.json({
    success: false,
    message: error.message,
    statusCode: error.statusCode || 500,
    statusMessage: error.status,
  });
};

const sendErrorProd = (error, res) => {
  // Operational, trusted error: send message to client
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", error);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

async function errorHandler(error, req, res, next) {
  // for (let index = 0; index < req.files?.length; index++) {
	// 	const element = req.files[index];
	// 	fs.rmSync(element.path);
	// }
	// if (req.file) {
	// 	fs.rmSync(req.file.path);
	// }
	// const userData = res.locals.userData;
  // console.log('\x1b[34m%s\x1b[0m', userData?.username, '\n', req.query, '\n', req.body, '\n', error.stack);
  
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    sendErrorProd(error, res);
  }
}

module.exports = { errorHandler };
