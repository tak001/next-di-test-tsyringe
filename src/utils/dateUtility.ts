import { parse, parseISO } from 'date-fns';
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';

/**
 * 日付ユーティリティ
 */
export class DateUtils {
  /**
   * 日付をISO8601形式の文字列に変換する
   * FE<->BE間の日付のやり取りに使用する
   */
  public static stringify(date: Date): string {
    return date.toISOString();
  }

  /**
   * ISO8601形式の文字列を日付に変換する
   * FE<->BE間の日付のやり取りに使用する
   */
  public static parse(date: string): Date {
    return parseISO(date);
  }

  /**
   * yyyy/MM/ddの日付を取得する
   * HH:mm:ssは00:00:00で固定
   */
  public static newDate(date?: string | Date): Date {
    if (typeof date === 'string') {
      const newDate = new Date(date);
      return new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
      );
    }

    if (date instanceof Date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const newDate = new Date();
    return new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
    );
  }

  public static endOfJSTDayAsUTC(dateString: string | Date): Date {
    const jstDate = new Date(dateString);
    return new Date(
      Date.UTC(
        jstDate.getFullYear(),
        jstDate.getMonth(),
        jstDate.getDate(),
        14,
        59,
        59,
      ),
    );
  }

  public static startOfJSTDayAsUTC(dateString: string | Date): Date {
    const jstDate = new Date(dateString);
    return new Date(
      Date.UTC(
        jstDate.getFullYear(),
        jstDate.getMonth(),
        jstDate.getDate() - 1,
        15,
      ),
    );
  }

  /**
   * HH:mmの時間を取得する
   * yyyy/MM/ddは1970/01/01、ssは00で固定
   */
  public static newTime(date?: string | Date): Date {
    if (typeof date === 'string') {
      const newDate = new Date(date);
      return new Date(1970, 0, 1, newDate.getHours(), newDate.getMinutes());
    }

    if (date instanceof Date) {
      return new Date(1970, 0, 1, date.getHours(), date.getMinutes());
    }

    const newDate = new Date();
    return new Date(1970, 0, 1, newDate.getHours(), newDate.getMinutes());
  }

  /**
   * 日付をJSTの文字列（yyyy/MM/dd HH:mm:ss）に変換する
   */
  public static formatJSTDateTime(date: string | Date): string {
    let utcDate: Date;
    if (typeof date === 'string') {
      utcDate = parseISO(date);
    } else {
      utcDate = date;
    }

    const jst = toZonedTime(utcDate, 'Asia/Tokyo');
    return format(jst, 'yyyy/MM/dd HH:mm:ss');
  }

  /**
   * 日付をJSTの文字列（yyyy/MM/dd）に変換する
   */
  public static formatJSTDate(date: string | Date): string {
    let utcDate: Date;
    if (typeof date === 'string') {
      utcDate = parseISO(date);
    } else {
      utcDate = date;
    }

    const jst = toZonedTime(utcDate, 'Asia/Tokyo');
    return format(jst, 'yyyy/MM/dd');
  }

  /**
   * 日付をJSTの文字列（HH:mm）に変換する
   */
  public static formatJSTTime(date: string | Date): string {
    let utcDate: Date;
    if (typeof date === 'string') {
      utcDate = parseISO(date);
    } else {
      utcDate = date;
    }

    const jst = toZonedTime(utcDate, 'Asia/Tokyo');
    return format(jst, 'HH:mm');
  }

  /**
   * JSTの文字列（yyyy/MM/dd HH:mm:ss）を日付に変換する
   */
  public static parseJSTDateTime(date: string): Date {
    if (!/^\d{4}\/\d{2}\/\d{2} \d{2}\:\d{2}\:\d{2}$/.test(date)) {
      throw new Error('Invalid date format');
    }

    const parsed = parse(date, 'yyyy/MM/dd HH:mm:ss', new Date());
    return fromZonedTime(parsed, 'Asia/Tokyo');
  }

  /**
   * JSTの文字列（yyyy/MM/dd）を日付に変換する
   */
  public static parseJSTDate(date: string): Date {
    if (!/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
      throw new Error('Invalid date format');
    }

    const parsed = parse(`${date} 00:00:00`, 'yyyy/MM/dd HH:mm:ss', new Date());
    return fromZonedTime(parsed, 'Asia/Tokyo');
  }

  /**
   * JSTの文字列（HH:mm）を日付に変換する
   */
  public static parseJSTTime(date: string): Date {
    if (!/^\d{2}\:\d{2}$/.test(date)) {
      throw new Error('Invalid date format');
    }

    const parsed = parse(
      `1970/01/01 ${date}:00`,
      'yyyy/MM/dd HH:mm:ss',
      new Date(),
    );
    return fromZonedTime(parsed, 'Asia/Tokyo');
  }

  /**
   * 日付の差分を計算し、時間単位（小数点第二位まで）で返す
   */
  public static calcTimeDiff(from: Date, to: Date): number {
    const diff = to.getTime() - from.getTime();
    return Math.round(diff / 10 / 60 / 60) / 100;
  }

  /**
   * 現在の月を取得する
   */
  public static getCurrentMonth(): number {
    const today = new Date();
    const jst = toZonedTime(today, 'Asia/Tokyo');
    return jst.getMonth() + 1;
  }

  /**
   * 前月の月を取得する
   */
  public static getLastMonth(): number {
    const today = new Date();
    const jst = toZonedTime(today, 'Asia/Tokyo');
    return jst.getMonth() === 0 ? 12 : jst.getMonth();
  }

  /**
   * 2ヶ月前の月を取得する
   */
  public static getTwoMonthsAgo(): number {
    const today = new Date();
    const jst = toZonedTime(today, 'Asia/Tokyo');
    const twoMonthsAgo = jst.getMonth() - 1;
    return twoMonthsAgo <= 0 ? twoMonthsAgo + 12 : twoMonthsAgo;
  }

  /**
   * YYYY/MM/DDをYYYY-MM-DDに変換する
   */
  public static convertToYYYYMMDD(dateString: string): string {
    return dateString.replace(/\//g, '-');
  }

  public static getMonthStartAndEnd = (
    dateString: string,
  ): { start: string; end: string } => {
    const [year, month] = dateString.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const formatDate = (date: Date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    return {
      start: formatDate(startDate),
      end: formatDate(endDate),
    };
  };
}
