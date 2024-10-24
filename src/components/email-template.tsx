import * as React from 'react';

interface EmailTemplateProps {
  token: string;
}

const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//` : '';
const Host = typeof window !== 'undefined' ? `${window.location.host}` : '';

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ token }) => (
  <div>
    <h1>Request for reset password</h1>
    <a href={`http://localhost:3000/resetpassword/${token}`}>Click here to reset your password</a>
  </div>
);
