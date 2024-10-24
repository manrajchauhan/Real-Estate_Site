import { NextRequest, NextResponse } from "next/server";
import Property from "../../../../model/property";
import Amenities from "../../../../model/amenitise";
import dbConnect from "../../../../lib/dbConnect";
import Images from "@/model/images";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dbju6ds0a', 
    api_key: '599263529264192', 
    api_secret: 'AVQ1msj3uk3hN0vhrC-4Ji-ZbLE' 
  });
  

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();
        const { toggle, date, floorimage, name, price, description, requirement, sortlocation, fulllocation, mapsrc, carpetsize, parking, bhk, floor, bath, type, amenities, images, id } = data;
        // console.log(name, price, description, requirement, sortlocation, fulllocation, carpetsize, parking, bhk, type, amenities, images);
        const AmenitiesData = JSON.parse(amenities);
        const FloorImage = floorimage == "default" ? null : JSON.parse(floorimage);
        const ImageData = JSON.parse(images);
        if (!name || !id || !price || !description || !sortlocation || !fulllocation || !mapsrc || !carpetsize || !parking || !bhk || !floor || !bath || !type || AmenitiesData.length === 0) {
            return NextResponse.json({ success: false, message: 'Fields are empty' }, { status: 400 });
        }
        await dbConnect();

        const property = await Property.findByIdAndUpdate(id, {
            bought:toggle, date, floorarea: floorimage == "default"? "default": FloorImage[0], name, price, description, requirement, sortlocation, fulllocation, mapsrc, carpetsize, parking, bhk, floor, bath, type
        });

        if (!property) {
            return NextResponse.json({ success: false, message: 'Property not found' }, { status: 404 });
        }

        const ame = await Amenities.deleteMany({ propertyid: id });

        if (ame) {
            for (const item of AmenitiesData) {
                await Amenities.create({ amenities: item, propertyid: property._id });
            }

            if (ImageData.length > 0) {
                for (const item of ImageData) {
                    await Images.create({ images: item, propertyid: property._id });
                }
            }
        }
        if(floorimage){
            const deletefloorimage = property.floorarea.split("/");
            cloudinary.uploader.destroy(deletefloorimage[deletefloorimage.length - 1].split(".")[0],(error:any,result:any) => {
            })
        }
        return NextResponse.json({ success: true, message: "Property updated successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
