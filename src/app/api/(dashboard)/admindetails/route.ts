import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const revalidate = 0;
export async function GET(request: NextRequest) {
   try {
    const token = request.cookies.get('auth')?.value || '';
    const veryfiToken = jwt.verify(token,process.env.KEY!);
    if (!veryfiToken || typeof veryfiToken !== 'object' || !('email' in veryfiToken)) {
      return NextResponse.json({ success: false, message: 'Invalid token structure' }, { status: 400 });
    }    
    
    return NextResponse.json({ success: true, message: `Welcome ${veryfiToken.email}`},{ status: 200 });
   } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
   }
}
