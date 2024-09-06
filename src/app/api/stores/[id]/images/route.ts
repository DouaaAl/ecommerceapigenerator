import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async(req: NextApiRequest | any, res: NextApiResponse) =>{
    const {url} = await req.json();
    const newImage = await db.image.create({
        data:{
            url
        }
    })

    return new NextResponse(JSON.stringify(newImage), {status:200})
}