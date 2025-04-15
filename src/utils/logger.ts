import { pino } from 'pino';
import { uuidv7 } from 'uuidv7';
import { asyncLocalStorage } from './asyncLocalStorage';
import { DateUtils } from './dateUtility';

export class Logger {
  private static instance: pino.Logger;
  private static children: { [requestId: string]: pino.Logger } = {};

  private constructor() {}

  private static getInstance(): pino.Logger {
    if (!Logger.instance) {
      Logger.instance = pino({
        level: process.env.LOG_LEVEL || 'info',
        formatters: {
          level(label, _number) {
            return { level: label };
          },
        },
        base: null,
        // NOTE: ログのタイムスタンプはUTCで出力する
        timestamp: () => `,"time":"${DateUtils.stringify(new Date())}"`,
      });
    }
    return Logger.instance;
  }

  public static createChild(): pino.Logger {
    const requestId = uuidv7();
    asyncLocalStorage.enterWith(new Map([['requestId', requestId]]));

    const child = this.getInstance().child({
      requestId,
    });
    this.children[requestId] = child;

    return child;
  }

  public static removeChild(): void {
    const requestId = asyncLocalStorage.getStore()?.get('requestId');

    if (!requestId) {
      return;
    }

    delete this.children[requestId];
  }

  private static getChild(): pino.Logger {
    const requestId = asyncLocalStorage.getStore()?.get('requestId');

    if (!requestId) {
      return this.getInstance();
    }

    return this.children[requestId];
  }

  static trace(obj: unknown, msg?: string | undefined, ...args: any[]): void {
    this.getChild().trace(obj, msg, ...args);
  }

  public static debug(
    obj: unknown,
    msg?: string | undefined,
    ...args: any[]
  ): void {
    this.getChild().debug(obj, msg, ...args);
  }

  public static info(
    obj: unknown,
    msg?: string | undefined,
    ...args: any[]
  ): void {
    this.getChild().info(obj, msg, ...args);
  }

  public static warn(
    obj: unknown,
    msg?: string | undefined,
    ...args: any[]
  ): void {
    this.getChild().warn(obj, msg, ...args);
  }

  public static error(
    obj: unknown,
    msg?: string | undefined,
    ...args: any[]
  ): void {
    this.getChild().error(obj, msg, ...args);
  }

  public static fatal(
    obj: unknown,
    msg?: string | undefined,
    ...args: any[]
  ): void {
    this.getChild().fatal(obj, msg, ...args);
  }
}
