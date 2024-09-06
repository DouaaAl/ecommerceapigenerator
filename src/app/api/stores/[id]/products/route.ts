import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async(req: NextApiRequest, res: NextApiResponse) =>{
    const products = await db.product.findMany({
      include: {
        Categories: true,
        Sizes: true,
        Color: true,
        Images: true,
      }
    });

    return new NextResponse(JSON.stringify(products), {status: 200})
}

export const POST = async (req: any | NextApiRequest, res: NextApiResponse) => {
  try {
    const storeId = req.url.split("/").slice(-2, -1)[0];
    const body = await req.json().catch(() => ({}));


    if (!body.name || body.price === undefined || body.quantity === undefined || body.featured === undefined ) {
      return new NextResponse(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name: body.name,
        price: body.price,
        quantity: body.quantity,
        featured: body.featured,
        description: body.description,
        storeId: storeId,
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
      },
    });

    console.log('Product created:', product);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};