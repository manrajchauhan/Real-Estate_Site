import {  NextResponse } from "next/server";
import { EmailTemplate } from '../src/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SendEmail = async (token:string) => {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['pritamjoardar200027@gmail.com'],
        subject: 'Hello world',
        react: EmailTemplate({ token: `${token}` }) as React.ReactElement,
    });

    if (error) {
        return NextResponse.json({ success: false, message: error }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: "Reset link Successfull send your mail address"}, { status: 200 });
};

export default SendEmail;