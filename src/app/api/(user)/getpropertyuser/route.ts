import dbConnect from "@/lib/dbConnect";
import Property from "@/model/property";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const data = await Property.aggregate([
      {
        $match: { bought: false }
      },
      {
        $sort: { createdAt: -1 } 
      },
      {
        $limit: 6, 
      },
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "propertyid",
          as: "images",
        },
      },
      {
        $project: {
          name: 1,
          bhk:1,
          description: 1,
          price: 1,
          images: 1,
          bath:1,
          carpetsize:1,
          sortlocation:1,
          requirement:1
        }  
      }
    ]);
    
    return NextResponse.json({ success: true, allPropertiesData:data }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
