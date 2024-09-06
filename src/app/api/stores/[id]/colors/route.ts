import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async() =>{
    const colors = await db.color.findMany({});

    return new NextResponse(JSON.stringify(colors), {status: 200})
}

export const POST = async(req: NextApiRequest | any, res: NextApiResponse) =>{
    const storeId = req.url.split("/")[req.url.split("/").length - 2];
    const body = await req.json();
    const name = body.name;

    if (!storeId || !name){
        return new NextResponse("Missing Data", {status: 400})
    }

    const newItem = await db.color.create({
        data:{
            storeId,
            name
        }
    })

    return new NextResponse(JSON.stringify(newItem), {status: 200})
}