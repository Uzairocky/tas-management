import messageUtil from "./message";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";

type Res = {
  success: boolean;
  message: string;
  data?: any;
  token?: string | null;
};

const successResponse = (
  res: Response,
  message: string,
  data?: any,
  token?: string | null
) => {
  const response: Res = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
    response.token = token;
  }

  res.status(StatusCodes.OK).send(response);
};
type Resp = {
  success: boolean;
  message: string;
  data?: any;
  token?: string | null;
};
const successResponseFalse = (
  res: Response,
  message: string,
  data?: any,
  token?: string | null
) => {
  const response: Resp = {
    success: false,
    message,
  };

  if (data) {
    response.data = data;
    response.token = token;
  }

  res.status(StatusCodes.OK).send(response);
};

const serverErrorResponse = (res: Response, error: any) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: error.toString(),
    message: messageUtil.SERVER_ERROR,
  });
};

const validationErrorResponse = (res: Response, errors: any) => {
  res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({
    success: false,
    error: errors,
    message: messageUtil.VALIDATION_ERRORS,
  });
};

const badRequestErrorResponse = (res: Response, message: String) => {
  res.status(StatusCodes.BAD_REQUEST).send({
    success: false,
    message,
  });
};

const userExistResponse = (res: Response, message: String) => {
  res.status(StatusCodes.OK).send({
    success: true,
    message,
  });
};

const existAlreadyResponse = (res: Response, message: String) => {
  res.status(StatusCodes.CONFLICT).send({
    success: false,
    message,
  });
};

const notFoundResponse = (res: Response, message: String, data: {}) => {
  res.status(StatusCodes.NOT_FOUND).send({
    success: false,
    message,
    data,
  });
};

const authorizationErrorResponse = (res: Response, message: String) => {
  res.status(StatusCodes.UNAUTHORIZED).send({
    success: false,
    message,
  });
};

const manyRequestErrorResponse = (res: Response, message: String) => {
  res.status(StatusCodes.TOO_MANY_REQUESTS).send({
    success: false,
    message,
  });
};
export {
  successResponse,
  serverErrorResponse,
  validationErrorResponse,
  badRequestErrorResponse,
  userExistResponse,
  existAlreadyResponse,
  notFoundResponse,
  authorizationErrorResponse,
  manyRequestErrorResponse,
  successResponseFalse,
};
