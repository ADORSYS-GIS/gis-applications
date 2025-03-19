import { AcceptedCandidat } from '@app/components/emails/accepted-candidat';
import { OnsiteInterview } from '@app/components/emails/onsite-interview';
import { PhoneInterview } from '@app/components/emails/phone-interview';
import { RejectedCandidat } from '@app/components/emails/rejected-candidat';
import { env } from '@app/env';
import type { Application } from '@prisma/client';
import { render } from '@react-email/render';
import { type SendMailOptions } from 'nodemailer';

export async function getSendPhoneInterviewOptions({
  application,
}: {
  application: Application;
}): Promise<SendMailOptions> {
  const el = <PhoneInterview {...application} />;

  const [html, text] = await Promise.all([
    render(el, {
      pretty: true,
    }),
    render(el, {
      pretty: true,
      plainText: true,
    }),
  ]);

  return {
    from: env.SMTP_FROM,
    replyTo: env.SMTP_REPLY_TO,
    to: application.email,
    subject: '[GIS] Invitation to Phone interview!',
    html,
    text,
  };
}

export async function getSendOnsiteInterviewOptions({
  application,
}: {
  application: Application;
}): Promise<SendMailOptions> {
  const el = <OnsiteInterview {...application} />;

  const [html, text] = await Promise.all([
    render(el, {
      pretty: true,
    }),
    render(el, {
      pretty: true,
      plainText: true,
    }),
  ]);

  return {
    from: env.SMTP_FROM,
    replyTo: env.SMTP_REPLY_TO,
    to: application.email,
    subject: '[GIS] Invitation to OnSite Interview!',
    html,
    text,
  };
}

export async function getAcceptedOptions({
  application,
}: {
  application: Application;
}): Promise<SendMailOptions> {
  const el = <AcceptedCandidat {...application} />;

  const [html, text] = await Promise.all([
    render(el, {
      pretty: true,
    }),
    render(el, {
      pretty: true,
      plainText: true,
    }),
  ]);

  return {
    from: env.SMTP_FROM,
    replyTo: env.SMTP_REPLY_TO,
    to: application.email,
    subject: '[GIS] Welcome to GIS Training!',
    html,
    text,
  };
}

export async function getRejectedOptions({
  application,
}: {
  application: Application;
}): Promise<SendMailOptions> {
  const el = <RejectedCandidat {...application} />;

  const [html, text] = await Promise.all([
    render(el, {
      pretty: true,
    }),
    render(el, {
      pretty: true,
      plainText: true,
    }),
  ]);

  return {
    from: env.SMTP_FROM,
    replyTo: env.SMTP_REPLY_TO,
    to: application.email,
    subject: '[GIS] Sorry!',
    html,
    text,
  };
}
