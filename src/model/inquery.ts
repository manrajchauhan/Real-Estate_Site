import mongoose from "mongoose";

 const inquerySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneno:{ 
        type:Number,
        required:true,
    },
    note : {
        type:String,
        require:true,
    },
    openstatus : {
        type:Boolean,
        require:true,
        default: false,
    },
    inquirystatus : {
        type:String,
        default:"open",
        enum: ["open","processing","closed"]
    },
    
 },{ timestamps: true });

const inquiries = mongoose.models.inquiries ||  mongoose.model("inquiries",inquerySchema);
export default inquiries;