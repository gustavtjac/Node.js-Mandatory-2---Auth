import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRegisterMail(email){

     const { data, error } = await resend.emails.send({
    from: 'noreply@gorillahub.dk',
    to: email,
    subject: 'Thanks for signing up!',
    html: '<strong>Thank you for signing up</strong>'
  });

  if (error) {
    throw new Error(`Failed to send registration email: ${error.message}`);
  }

  return data;

};