import { ErrorBase } from './errorBase';

export class UnauthorizedError extends ErrorBase {
  statusCode = 401;

  constructor(message = 'Unauthorized') {
    super(message);
  }
}
