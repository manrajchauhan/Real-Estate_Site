import dbConnect from "@/lib/dbConnect";
import Property from "@/model/property";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const bhk = searchParams.get("bhk");
  const location = searchParams.get("location");
  const propertyName = searchParams.get("propertyname");

  try {
    await dbConnect();

  
      return NextResponse.json({ success: false, message: "Invalid search parameters" }, { status: 400 });
    
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
