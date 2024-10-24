import dbConnect from "@/lib/dbConnect";
import Property from "@/model/property";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const _id = params.id;
  try {
    await dbConnect();

    // Convert _id to ObjectId
    const objectId = new mongoose.Types.ObjectId(_id);

    const data = await Property.aggregate([
      {
        $match: { _id: objectId }
      },
      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "propertyid",
          as: "images"
        }
      },
      {
        $lookup: {
          from: "amenities",
          localField: "_id",
          foreignField: "propertyid",
          as: "amenities"
        }
      }
    ]);
    return NextResponse.json({ success: true, allPropertiesData:data }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
