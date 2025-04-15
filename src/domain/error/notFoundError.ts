import { ErrorBase } from './errorBase';

export class NotFoundError extends ErrorBase {
  statusCode = 404;

  constructor(message = 'Not Found') {
    super(message);
  }
}
