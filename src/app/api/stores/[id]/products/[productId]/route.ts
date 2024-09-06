import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET =async (req: Request | NextRequest, res: NextApiResponse) =>{
    const productId = req.url?.split("/")[req.url?.split("/").length - 1];

    const product = await db.product.findFirst({
        where: {
            id: productId
        },
        include: {
            Categories: true,
            Sizes: true,
            Color: true,
            Images: true,
          }
    })

    return new NextResponse(JSON.stringify(product), {status: 200})
}

export const DELETE = async (req: Request | NextRequest, res: NextApiResponse) => {
    const productId = req.url?.split("/")[req.url?.split("/").length - 1];

    if (!productId) {
        return res.status(400).json({ message: "Missing Product ID" });
    }

    try {
        // Delete related models in the correct order
        await db.orderItem.deleteMany({
            where: {
                productId: productId
            }
        });

        await db.image.deleteMany({
            where: {
                productId: productId
            }
        });

        await db.product.update({
            where: { id: productId },
            data: {
                Sizes: { set: [] },
                Categories: { set: [] },
                Color: { set: [] }
            }
        });

        const deletedProduct = await db.product.delete({
            where: {
                id: productId
            }
        });

        return new NextResponse(JSON.stringify(deletedProduct), {status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message: " An Error occurred"}), {status: 500}) 
    }
};

export const PUT =async (req: any | Request | NextRequest, res: NextApiResponse) =>{
    console.log("inside put");
    const productId = req.url?.split("/")[req.url?.split("/").length - 1];
    console.log("product Id", productId)
    const body = await req.json();

    const product = await db.product.update({
        where:{
            id: productId
        },
        data: {
            featured: body.featured,
            name: body.name,
            price: body.price,
            description: body.description,
            quantity: body.quantity,
            Sizes: {
                connect: body.sizes ?? [],
              },
              Images: {
                connect: body.images ?? [],
              },
              Categories: {
                connect: body.categories ?? [],
              },
              Color: {
                connect: body.colors ?? [],
              },
        }
    })


    return new NextResponse(JSON.stringify(product), {status: 200})
}