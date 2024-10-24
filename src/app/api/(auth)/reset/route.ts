import { NextRequest, NextResponse } from "next/server";
import authUser from "@/model/auth";
import dbConnect from "@/lib/dbConnect";
import SendEmail from "../../../../../email/sendEmail";
import crypto from 'crypto'

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { email } = await request.json();
        const adminEmaiil = await authUser.findOne({ email });
        if (adminEmaiil) {
            const resettoken = crypto.randomBytes(32).toString("base64url");
            const today = new Date();
            const resettokenexpire = new Date(today.setDate(today.getDate()+1));
            await authUser.findByIdAndUpdate(adminEmaiil._id, { resettoken, resettokenexpire });
            SendEmail(resettoken);
            return NextResponse.json({ success: true, message: "Reset link Successfull send your mail address"}, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
