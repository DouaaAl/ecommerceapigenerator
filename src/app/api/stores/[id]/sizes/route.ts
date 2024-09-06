import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async() =>{
    const sizes = await db.size.findMany({});

    return new NextResponse(JSON.stringify(sizes), {status: 200})
}

export const POST = async(req: any | NextRequest | Request, res: NextApiResponse) =>{
    const storeId = req.url.split("/")[req.url.split("/").length - 2];
    const body = await req.json();
    const {name} = body;
    const newsize = await db.size.create({
        data: {
            name: name,
            storeId: storeId
        }
    })

    return new NextResponse(JSON.stringify(newsize), {status: 200});
}