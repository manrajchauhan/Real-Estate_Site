import dbConnect from "@/lib/dbConnect";
import inquiries from "@/model/inquery";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
   try {
      await dbConnect();
      const allinquiry = await inquiries.find({}).sort({ createdAt: -1 });
      const inquiryLimit = await inquiries.aggregate([
         { $match: { inquirystatus: { $ne: "closed" } } },
         { $sort: { createdAt: -1 } },
         { $limit: 5 }
      ])

      return NextResponse.json({ success: true, allinquiry: allinquiry, inquiryLimit:inquiryLimit }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
   }
}