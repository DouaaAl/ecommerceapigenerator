import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest | Request, res: NextApiResponse) => {
    const users = await db.user.findMany();
    return new NextResponse(JSON.stringify(users), {status: 200});
}