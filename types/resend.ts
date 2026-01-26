export interface SendEmailParams {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}
