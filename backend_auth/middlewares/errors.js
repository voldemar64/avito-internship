const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Произошла ошибка на сервере" : message,
  });
  next();
};

export default errorHandler;
