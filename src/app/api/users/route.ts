import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server"


export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await db.user.findMany();
    return new NextResponse(JSON.stringify(users), {status: 200});
}