import dbConnect from "@/lib/dbConnect";
import inquiries from "@/model/inquery";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET() {
   try {
      await dbConnect();
      const open = await inquiries.aggregate([
         { $match: { openstatus: false}},
      ])
      return NextResponse.json({ success: true, openinquiry: open.length }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
   }
}