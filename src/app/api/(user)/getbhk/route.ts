import dbConnect from "@/lib/dbConnect";
import Property from "@/model/property";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const groupbhk = await Property.aggregate([
      {
        $match: { bought: false }
      },
      {
        $sort: { bhk: -1 }, 
      },
      {
        $group:{
          _id:"$bhk"
        }
      },
    ]);

    const grouplocation = await Property.aggregate([
      {
        $match: { bought: false }
      },
      {
        $group:{
          _id:"$sortlocation"
        }
      },
    ]);

    const groupname = await Property.aggregate([
      {
        $match: { bought: false }
      },
      {
        $group:{
          _id:"$name"
        }
      },
    ]);
    return NextResponse.json({ success: true, bhk:groupbhk, location:grouplocation, propertyname:groupname }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
