import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next"
import {  NextResponse } from "next/server"

export const DELETE = async(req: any | NextApiRequest, res: NextApiResponse) =>{
    const body = await req.json();
    const id = req.url.split("/")[req.url.split("/").length - 1];

    if (!body.userId || !id) {
        return res.status(400).json({ message: "Missing Data" });
    }

    try {
        // Delete related models in the correct order
        await db.orderItem.deleteMany({
            where: {
                order: {
                    storeId: id
                }
            }
        });

        await db.paymentDetail.deleteMany({
            where: {
                order: {
                    storeId: id
                }
            }
        });

        await db.shippingDetail.deleteMany({
            where: {
                order: {
                    storeId: id
                }
            }
        });

        await db.order.deleteMany({
            where: {
                storeId: id
            }
        });

        await db.image.deleteMany({
            where: {
                product: {
                    storeId: id
                }
            }
        });

        await db.product.deleteMany({
            where: {
                storeId: id
            }
        });

        await db.size.deleteMany({
            where: {
                storeId: id
            }
        });

        await db.color.deleteMany({
            where: {
                storeId: id
            }
        });

        await db.category.deleteMany({
            where: {
                storeId: id
            }
        });

        const deletedStore = await db.store.delete({
            where: {
                id: id,
                userId: body.userId
            }
        });

        return new NextResponse(JSON.stringify(deletedStore), {status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "An error occurred", error }), {status: 500});
    }
}

export const PUT = async(req: any | NextApiRequest, res: NextApiResponse) =>{
    const body = await req.json();
    const id = req.url.split("/")[req.url.split("/").length - 1];

    if(!body.name || !id || !body.userId){
        return new NextResponse("Missing Data", {status: 400})
    }

    const updateItem = await db.store.update({
        where: {
            id,
            userId: body.userId
        },
        data: {
            name: body.name
        }
    })

    return new NextResponse(JSON.stringify(updateItem), {status: 200})
}