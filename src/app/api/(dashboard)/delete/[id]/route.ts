import Amenities from "@/model/amenitise";
import Images from "@/model/images";
import Property from "@/model/property";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from "@/lib/dbConnect";

cloudinary.config({ 
  cloud_name: 'dbju6ds0a', 
  api_key: '599263529264192', 
  api_secret: 'AVQ1msj3uk3hN0vhrC-4Ji-ZbLE' 
});
export async function DELETE(request: NextRequest, {params}:{params: {id: string}}) {
  const {id} = params;
  const imagearray:string[]=[];
  try {
    await dbConnect();
    const imageFind = await Images.find({propertyid:id})
    imageFind.forEach(async(item)=>{
      const imageUrl = item.images.split("/");
      const cloudImage:string = imageUrl[imageUrl.length - 1];
      const cloudImageSplit = cloudImage.split(".");
      imagearray.push(cloudImageSplit[cloudImageSplit.length-2])
    })

    const image = await Images.deleteMany({propertyid:id})
    const amenities = await Amenities.deleteMany({propertyid:id})
    const Propertyes = await Property.findByIdAndDelete({_id:id})

    if(image && amenities && Propertyes){
      
      imagearray.forEach((item)=>
        cloudinary.uploader.destroy(item,(error:any,result:any) => {
        })
      )
      if(Propertyes.floorarea){
        const deletefloorimage = Propertyes.floorarea.split("/");
        cloudinary.uploader.destroy(deletefloorimage[deletefloorimage.length - 1].split(".")[0],(error:any,result:any) => {
        })
      }

        return NextResponse.json({ success: true, message: "Property deleted successfully"},{ status: 200 });
      }

      return NextResponse.json({ success: true, message: "something went wrong"},{ status: 400 });
  } catch (error) {
    
  }

    return NextResponse.json({ success: false, message: `Internal server error`},{ status: 500 });

}
