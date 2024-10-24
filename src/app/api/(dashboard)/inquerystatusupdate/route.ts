import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../../lib/dbConnect";
import inquiries from "@/model/inquery";

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const { status, id } = data;
        await dbConnect();
        console.log(status, id);
        const update = await inquiries.findByIdAndUpdate(id,{inquirystatus:status})
        if(update){
            return NextResponse.json({ success: true, message: "Property updated successfully" }, { status: 200 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
