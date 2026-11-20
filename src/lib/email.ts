import { Resend } from 'resend';
import { ProjectCreatedEmail } from '@/emails/ProjectCreatedEmail';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export const sendProjectCreatedEmail = async (email: string, userName: string, projectName: string) => {
  if (process.env.NODE_ENV === 'development' && process.env.ENABLE_EMAILS !== 'true') {
    console.log(`[DEV MODE] Mock sending ProjectCreatedEmail to ${email} for project: ${projectName}`);
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'CodeSpace <noreply@codespace.dev>',
      to: [email],
      subject: `Project ${projectName} is ready!`,
      react: React.createElement(ProjectCreatedEmail, {
        userName,
        projectName,
        projectUrl: `https://codespace.dev/dashboard`,
      }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send email:', err);
    // We return success: false instead of throwing to prevent blocking the DB mutation
    return { success: false, error: err };
  }
};
