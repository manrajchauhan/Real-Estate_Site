import dbConnect from "@/lib/dbConnect";
import inquiries from "@/model/inquery";
import {  NextResponse } from "next/server";

export const revalidate = 0;
export async function PUT() {
   try {
      await dbConnect();
      const open = await inquiries.updateMany({},{$set:{ openstatus: true}})
      if(open){
         return NextResponse.json({ success: true }, { status: 200 });
      }
      console.log(open);
   } catch (error: any) {
      return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
   }
}