import { ErrorBase } from './errorBase';

export class BadRequestError extends ErrorBase {
  statusCode = 400;

  constructor(message = 'Bad Request') {
    super(message);
  }
}
