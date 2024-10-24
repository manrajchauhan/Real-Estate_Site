import { NextRequest, NextResponse } from "next/server";
import authUser from "@/model/auth";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { token } = await request.json();
        const admin = await authUser.findOne({ resettoken: token});
        if (admin) {
            return NextResponse.json({ success: true, message: "token valid"}, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
