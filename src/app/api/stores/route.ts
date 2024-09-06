import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export const GET = async(req: NextApiRequest, res: NextApiRequest) =>{
    const stores = await db.store.findMany()

    return new NextResponse(JSON.stringify(stores), {status: 200})
}

export const POST = async(req: any | NextApiRequest, res: NextApiResponse) =>{
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

export const DELETE = async(req: NextApiRequest, res: NextApiRequest) => {
    const newStore = await db.store.deleteMany({});

    return new NextResponse("deleted Successfully")
}