import { NextRequest, NextResponse } from "next/server";
import authUser from "@/model/auth";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt"
import crypto from 'crypto'

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { password, token } = await request.json();
        const admin = await authUser.findOne({ resettoken: token });
        const salt = await bcrypt.genSalt(10);
        const HasPassword = await bcrypt.hash(password,salt);
        if (admin) {
            const resettoken = crypto.randomBytes(32).toString("base64url");
            await authUser.findByIdAndUpdate(admin._id, { password:HasPassword, resettoken });
            return NextResponse.json({ success: true, message: "password successfully updated"}, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
