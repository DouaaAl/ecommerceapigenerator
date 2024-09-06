import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req: any | NextRequest | Request, res: NextApiResponse) =>{
    const sizeId = req.url.split("/")[req.url.split("/").length - 1];
    const body = await req.json();
    const {newname} = body;
    console.log("newname :", newname);
    const updatedSize = await db.size.update({
        where:{
            id: sizeId
        },
         data: {
            name: newname
         }
    })

    return new NextResponse(JSON.stringify(updatedSize), {status: 200})
}

export const DELETE = async(req: any | NextRequest | Request, res: NextApiResponse) =>{
    const sizeId = req.url.split("/")[req.url.split("/").length - 1];
    
    const deleteSize = await db.size.delete({
        where:{
            id: sizeId
        }
    })

    return new NextResponse(JSON.stringify("deleted successfully"), {status: 200})
}