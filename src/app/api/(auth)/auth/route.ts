import { NextRequest, NextResponse } from "next/server";
import authUser from "@/model/auth";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { email, password } = await request.json();
        // const salt = await bcrypt.genSalt(10);
        // const HasPassword = await bcrypt.hash(password,salt);
        // await authUser.create({email,password:HasPassword});
        const admin = await authUser.findOne({ email});
        const comparePassword = await bcrypt.compare(password,admin.password);
        // Check if user exists
        if (admin && comparePassword) {
            const tokenData ={
                id: admin._id,
                email : admin.email,
                password : admin.password
            }
            const token = await jwt.sign(tokenData,process.env.KEY!,{expiresIn: "1d"});
            const response = NextResponse.json({
                message :"Login successful",
                success : true,
            })
            response.cookies.set('auth',token,{
                httpOnly : true,
            })
            return response;
        } else {
            return NextResponse.json({ success: false, message: "Incorrect email and password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
