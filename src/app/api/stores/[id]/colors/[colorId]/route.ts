import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const PUT = async(req: any | NextApiRequest, res: NextApiResponse) => {
    const colorId = req.url.split("/")[req.url.split("/").length - 1];
    const storeId = req.url.split("/")[req.url.split("/").length - 3];


    const body = await req.json();
    const newname = body.newname;

    const color = await db.color.update({
        where: {
            id: colorId,
            storeId: storeId
        },
        data:{
            name: newname
        }
    })

    console.log(color);
    return new NextResponse(JSON.stringify(color), {status: 200})
}

export const DELETE = async(req: any | NextApiRequest, res: NextApiRequest) =>{
    const colorId = req.url.split("/")[req.url.split("/").length - 1];

    const color = await db.color.delete({
        where: {
            id: colorId
        }
    })

    return new NextResponse(JSON.stringify(color), {status: 200})  
}

