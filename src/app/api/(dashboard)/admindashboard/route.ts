import dbConnect from "@/lib/dbConnect";
import Property from "@/model/property";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(request: NextRequest) {
   try {
      await dbConnect();
      const allProperties = await Property.find({}).sort({createdAt:-1});

      const Buy = await Property.aggregate([
         {
            $match:{ requirement: "Buy"}
         },
         {
            $count: "totalBuyProperties" 
          }
      ]);

      const Rent = await Property.aggregate([
         {
            $match:{ requirement: "Rent"}
         },
         {
            $count: "totalrentProperties" 
          }
      ]);

      const Bought = await Property.aggregate([
         {
            $match:{ bought: true }
         },
         {
            $count: "totalboughtProperties" 
          }
      ]);
    return NextResponse.json({ success: true, allProperties: allProperties, totalBuyProperties:Buy, totalRentProperties:Rent, totalBoughtProperties:Bought, totalPropertiesLength:allProperties.length},{ status: 200 });
   } catch (error:any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
   }
}