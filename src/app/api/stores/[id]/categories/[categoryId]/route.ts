import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const PUT = async(req: any | NextApiRequest, res: NextApiResponse) => {
    const categoryId = req.url.split("/")[req.url.split("/").length - 1];

    const body = await req.json();
    const newname = body.newname;

    const category = await db.category.update({
        where: {
            id: categoryId
        },
        data:{
            name: newname
        }
    })

    return new NextResponse(JSON.stringify(category), {status: 200})
}

export const DELETE = async(req: any | NextApiRequest, res: NextApiRequest) =>{
    const categoryId = req.url.split("/")[req.url.split("/").length - 1];

    const category = await db.category.delete({
        where: {
            id: categoryId
        }
    })

    return new NextResponse(JSON.stringify(category), {status: 200})  
}

export const GET = async(req: any | NextApiRequest, res: NextApiResponse) => {
    const categoryId = req.url.split("/")[req.url.split("/").length - 1];


    const category = await db.category.findFirst({
        where: {
            id: categoryId
        }
    })

    return new NextResponse(JSON.stringify(category), {status: 200})
}