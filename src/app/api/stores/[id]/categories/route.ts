import { db } from "@/utils/db"
import { auth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"

export const GET = async(req: any | NextApiRequest, res: NextApiResponse) =>{
    const storeId = req.url.split("/")[req.url.split("/").length - 2];
    const categories = await db.category.findMany({
        where:{
            storeId
        }
    })

    return new NextResponse(JSON.stringify(categories), {status: 200})
}

export const POST = async(req: any | NextApiRequest, res: NextApiResponse) => {
    const storeId = req.url.split("/")[req.url.split("/").length - 2];
    const body = await req.json();
    const {name} = body;

    console.log(name, storeId);
    if (!name  || !storeId){
        return new NextResponse("Missing Data", {status: 400})
    }

    const category = await db.category.create({
        data:{
            name: name || "",
            storeId,
        }
    })

    return new NextResponse(JSON.stringify(category), {status: 200})
}