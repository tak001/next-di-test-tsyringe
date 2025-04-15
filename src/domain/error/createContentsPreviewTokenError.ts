export const CreateContentsPreviewTokenErrorReason = {
  Failed: 'failed',
} as const;
export type CreateContentsPreviewTokenErrorReason =
  (typeof CreateContentsPreviewTokenErrorReason)[keyof typeof CreateContentsPreviewTokenErrorReason];

export type CreateContentsPreviewTokenError =
  | {
      success: true;
      token?: string;
    }
  | {
      success: false;
      reason: CreateContentsPreviewTokenErrorReason;
    };
