"use server";
import axios from "axios";
const dev = process.env.NODE_ENV !== 'production';
const siteUrl = dev ? 'http://localhost:3000' : 'https://realsta.vercel.app'

const axiosInstance = axios.create({
  baseURL: siteUrl,
});

export const getAllProperties = async ()=>{
  const response = await axiosInstance.get("/api/dashboard");
  return response.data;
}