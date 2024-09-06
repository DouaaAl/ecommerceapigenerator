import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export const GET = async(req: NextRequest | Request, res: NextApiRequest) =>{
    const stores = await db.store.findMany()

    return new NextResponse(JSON.stringify(stores), {status: 200})
}

export const POST = async(req: any | NextRequest | Request, res: NextApiResponse) =>{
    const body = await req.json();
    if (!body.name || !body.userId){
        return new NextResponse("Data missing", { status: 400 })
    }
    const newStore = await db.store.create({
        data:{
            name: body.name || "name",
            userId: body.userId
        }
    })
    return new NextResponse(JSON.stringify(newStore));
}

export const DELETE = async(req: NextRequest | Request, res: NextApiRequest) => {
    const newStore = await db.store.deleteMany({});

    return new NextResponse("deleted Successfully")
}