
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let msg = err.message || "Something went wrong, Try again later...";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
