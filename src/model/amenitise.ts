import mongoose from "mongoose";

const amenitiseSchema = new mongoose.Schema({
    amenities: {
        type: String,
        required: true
    },
    propertyid :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties',
        require:true
    }
}, { timestamps: true });

const Amenities = mongoose.models.amenities || mongoose.model("amenities", amenitiseSchema);
export default Amenities;