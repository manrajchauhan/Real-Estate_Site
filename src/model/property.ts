import mongoose from "mongoose";

 const propertySchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    bought:{
        type:Boolean,
        default:false,
    },
    floorarea:{
        type:String,
        default:'default'
    },
    name:{
        type:String,
        required:true,
    },
    price:{ 
        type:String,
        required:true,
    },
    description : {
        type:String,
        required:true,
    },
    requirement : {
        type:String,
        enum:['Sell', 'Buy', 'Rent'],
        default: 'Sell',
    },
    sortlocation : {
        type:String,
        required:true,
    },
    fulllocation : {
        type:String,
        required:true,
    },
    mapsrc : {
        type:String,
        required:true,
    },
    carpetsize : {
        type:Number,
        required:true,
    },
    parking : {
        type:Number,
        required:true,
    },
    bhk : {
        type:Number,
        required:true,
    },
    floor : {
        type:String,
        required:true,
    },
    bath : {
        type:Number,
        required:true,
    },
    type : {
        type:String,
        required:true,
    }
 },{ timestamps: true });

const Property = mongoose.models.properties ||  mongoose.model("properties",propertySchema);
export default Property;