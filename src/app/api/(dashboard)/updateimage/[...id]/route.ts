import Images from "@/model/images";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from "@/lib/dbConnect";

cloudinary.config({ 
  cloud_name: 'dbju6ds0a', 
  api_key: '599263529264192', 
  api_secret: 'AVQ1msj3uk3hN0vhrC-4Ji-ZbLE' 
});

export async function DELETE(request: NextRequest, {params}:{params: {id: any}}) {
  const { id } = params;
  const singleString = id.join('/').replace('https:/', 'https://');
  
  try {
    await dbConnect();
    const imageDelete = await Images.deleteOne({images:singleString})
    const imageid = id[id.length - 1].split('.')[0];
    if(imageDelete){
        cloudinary.uploader.destroy(imageid,(error:any,result:any) => {
        })
      
        return NextResponse.json({ success: true, message: "Image deleted successfully"},{ status: 200 });
      }

      return NextResponse.json({ success: true, message: "something went wrong"},{ status: 400 });
  } catch (error:any) {
    
    return NextResponse.json({ success: false, message: error.message},{ status: 500 });
  }

}
