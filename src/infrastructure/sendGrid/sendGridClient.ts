import { convertBase64 } from '@/infrastructure/axios/convertBase64';
import { Logger } from '@/utils/logger';
import sgMail from '@sendgrid/mail';
import { injectable } from 'tsyringe';

export interface ISendGridClient {
  sendEmail(options: SendEmailOptions): Promise<void>;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  from: string;
  html?: string;
  attachmentUrl?: string;
  enableSandboxMode?: boolean;
}

export const SendGridClientSymbol = Symbol('SendGridClient');

@injectable()
export class SendGridClient implements ISendGridClient {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  /** メールを送信する */
  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { to, subject, text, from, html, attachmentUrl } = options;
    const enableSandboxMode = this.getEnableSandboxMode(
      options.enableSandboxMode,
    );

    const attachments = await this.buildAttachments(attachmentUrl);

    try {
      await sgMail.send({
        to,
        from,
        subject,
        text,
        html,
        mailSettings: {
          sandboxMode: {
            enable: enableSandboxMode,
          },
        },
        attachments,
        customArgs: {
          subject,
          stage: process.env.NEXT_PUBLIC_ENV_NAME,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  /** 添付ファイル情報を生成する */
  private async buildAttachments(attachmentUrl?: string) {
    if (!attachmentUrl) {
      return [];
    }

    const content = await convertBase64(attachmentUrl);
    const filename = this.extractFilename(attachmentUrl);

    return [
      {
        content,
        filename,
      },
    ];
  }

  private extractFilename(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  private getEnableSandboxMode(enableSandboxMode?: boolean) {
    if (enableSandboxMode === undefined) {
      return process.env.NEXT_PUBLIC_ENV_NAME === 'staging';
    }
    return enableSandboxMode;
  }
}
