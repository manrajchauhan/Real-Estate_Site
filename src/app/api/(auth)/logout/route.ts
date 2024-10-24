import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   try {
    const response = NextResponse.json({
        message: "Logout successfylly",
        success: true
    })

    response.cookies.set('auth',"",{
        httpOnly: true , expires: new Date(0)
    })
    return response;
   } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
   }
}
