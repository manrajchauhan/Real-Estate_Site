import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true
    },
    propertyid :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties',
        require:true
    }
}, { timestamps: true });

const Images = mongoose.models.images || mongoose.model("images", imagesSchema);
export default Images;