import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest | Request | any, res: NextApiResponse) =>{

    const storeId = req.url.split("/")[req.url.split("/").length - 2]
    const orders = await db.order.findMany({
        where:{
            storeId
        },
        include: {
          orderItems: true,
          shipping: true,
          payment: true,
        },
      });

      return new NextResponse(JSON.stringify(orders), {status: 200})
}

export const POST = async (req: NextRequest | Request | any, res: NextApiResponse) => {
  try {
    const storeId = req.url.split("/")[req.url.split("/").length - 2];
    const body = await req.json();
    const { totalAmount, status, orderItems, shippingDetail, paymentDetail } = body;

    if (!storeId || !totalAmount || !status || !orderItems || !shippingDetail || !paymentDetail) {
      console.log("Missing data");
      return new NextResponse("Missing Data", { status: 400 });
    }

    const productIds = orderItems.map((item: any) => item.productId);
    const existingProducts = await db.product.findMany({
      where: { id: { in: productIds } }
    });

    if (existingProducts.length !== productIds.length) {
      return new NextResponse("Some products do not exist", { status: 400 });
    }

    const newOrder = await db.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          storeId,
          totalAmount,
          status,
          orderItems: {
            create: orderItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
          shipping: {
            create: {
              address: shippingDetail.address,
              city: shippingDetail.city,
              state: shippingDetail.state,
              postalCode: shippingDetail.postalCode,
              country: shippingDetail.country,
            },
          },
          payment: {
            create: {
              paymentMethod: paymentDetail.paymentMethod,
              status: paymentDetail.status,
              transactionId: paymentDetail.transactionId,
            },
          },
        }
      });
      return order;
    });

    return new NextResponse(JSON.stringify(newOrder), { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};