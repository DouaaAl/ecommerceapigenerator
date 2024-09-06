import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: any | NextRequest | Request, res: NextApiResponse) =>{
    const body = await req.json();


    const id = req.url.split("/")[req.url.split("/").length - 1];
    const user = await db.user.findFirst({
        where:{
            id
        }
    })
    return new NextResponse(JSON.stringify(user));
}