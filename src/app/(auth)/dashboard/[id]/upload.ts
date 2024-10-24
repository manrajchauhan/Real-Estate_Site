
import axios from "axios";

export const uploadImages = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "q0xwteaf");
    formData.append("cloud_name","dbju6ds0a");
    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dbju6ds0a/image/upload', formData);
    return { publicId: data?.public_id , url: data?.secure_url};
  } catch (error) {
    throw error;
  }
};
