import { ErrorBase } from './errorBase';

export class InternalServerError extends ErrorBase {
  statusCode = 500;

  constructor(message = 'Internal Server Error') {
    super(message);
  }
}
