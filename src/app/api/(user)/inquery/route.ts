import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import inquiries from "@/model/inquery";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { username, phoneno, note } = data;
    try {
        if (!username || !phoneno || !note) {
            return NextResponse.json({ success: false, message: "data field is empty" }, { status: 400 });
        }
        await dbConnect();
        const dd = await inquiries.create({ name:username, phoneno, note });
        return NextResponse.json({ success: true, message: "Messages send successfuly" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}