import { NextRequest, NextResponse } from "next/server";
import Property from "../../../../model/property";
import Amenities from "../../../../model/amenitise";
import dbConnect from "../../../../lib/dbConnect";
import { v2 as cloudinary } from 'cloudinary';

import Images from "@/model/images";

cloudinary.config({ 
    cloud_name: 'dbju6ds0a', 
    api_key: '599263529264192', 
    api_secret: 'AVQ1msj3uk3hN0vhrC-4Ji-ZbLE' 
  });
  

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { date, toggle, floorimage, name, price , description, requirement, sortlocation, fulllocation,  mapsrc, carpetsize, parking, bhk, floor, bath, type,amenities,images} = data;

    const AmenitiesData = JSON.parse(amenities);
    const FloorImages = JSON.parse(floorimage);
    const ImageData = JSON.parse(images);
    const extractsrc = mapsrc.match(/src="([^"]+)"/)[1];
    // console.log(name, price, description, requirement, sortlocation, fulllocation, mapsrc, carpetsize, parking, bhk, type,amenities, images );
    try {
        if(!name ||  !price|| !description || !requirement || !sortlocation || !fulllocation || !mapsrc || !carpetsize || !parking || !bhk || !bath || !floor || !type || AmenitiesData.length === 0 || ImageData.length === 0){
            return NextResponse.json({ success: false, message: 'field are empty' }, { status: 204 });
        }
        await dbConnect();
        const db = await Property.create({ date, bought:toggle , floorarea:FloorImages[0], name, price, description, requirement, sortlocation, fulllocation, mapsrc:extractsrc, carpetsize, parking, bhk,floor,bath, type });
        AmenitiesData.forEach(async (item: string) =>
            await Amenities.create({ amenities: item ,propertyid:db._id})
        );
        ImageData.forEach(async (item: string) =>
            await Images.create({ images: item ,propertyid:db._id})
        );

        return NextResponse.json({ success: true, message: "Property added successfuly" }, { status: 200 });

    } catch (error:any) {
        ImageData.forEach((item:string)=>{
            const ImageDelete = item.split("/");
            cloudinary.uploader.destroy(ImageDelete[ImageDelete.length-1].split(".")[0],(error:any,result:any) => {
              })
        })
        const deletefloorimage = floorimage.split("/");
        cloudinary.uploader.destroy(deletefloorimage[deletefloorimage.length - 1].split(".")[0],(error:any,result:any) => {
        })
        return NextResponse.json({ success: false, message: error.message}, { status: 500 });
    }
}
