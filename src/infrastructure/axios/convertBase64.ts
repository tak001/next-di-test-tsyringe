import { Logger } from '@/utils/logger';
import { httpClient } from './FeAxiosClient';

export const convertBase64 = async (attachmentUrl: string) => {
  try {
    const response = await httpClient.get(attachmentUrl, {
      responseType: 'arraybuffer',
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY || '',
      },
    });
    const content = Buffer.from(response.data, 'binary').toString('base64');

    return content;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
};
