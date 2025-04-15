import { ErrorBase } from './errorBase';

export class ConflictError extends ErrorBase {
  statusCode = 409;

  constructor(message = 'Conflict') {
    super(message);
  }
}
