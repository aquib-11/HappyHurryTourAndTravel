import { StatusCodes } from "http-status-codes";

export class NotFoundErr extends Error{
    constructor(message){
        super(message);
        this.name = 'notFound';
        this.statusCode = StatusCodes.NOT_FOUND;
    }
};

export class badRequestErr extends Error {
  constructor(message) {
    super(message);
    this.name = "badRequestErr";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
};

export class UnAuthenticatedErr extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthenticatedErr";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
};

export class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedErr";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
};