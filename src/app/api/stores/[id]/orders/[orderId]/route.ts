import { db } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const PUT = async(req: any | NextApiRequest, res: NextApiResponse) =>{
    try {
            const orderId = req.url.split("/")[req.url.split("/").length - 1];
            const body = await req.json();
            const {orderStatus} = body;
        
            if (!orderId || !orderStatus) {
              return new NextResponse("Missing Data", { status: 400 });
            }
        
            const order = await db.order.findUnique({
              where: { id: orderId },
              include: { payment: true },
            });
        
            if (!order || !order.payment) {
              return new NextResponse("Order or Payment not found", { status: 404 });
            }
        
            const updatedOrder = await db.order.update({
              where: { id: orderId },
              data: { status: orderStatus },
            });
        
            return new NextResponse(JSON.stringify(updatedOrder), { status: 200 });
          } catch (error) {
            console.error('Error updating payment status:', error);
            return new NextResponse("Internal Server Error", { status: 500 });
          }
}

export const DELETE = async(req: any | NextApiRequest, res: NextApiResponse) =>{
        const orderId = req.url.split("/")[req.url.split("/").length - 1];  

        const order =  await db.order.findUnique({
          where: { id: orderId },
          include: {
            orderItems: true,
            shipping: true,
            payment: true,
          },
        });

        await db.orderItem.deleteMany({
          where: { orderId },
        });
      
          await db.shippingDetail.delete({
            where: { id: order?.shipping?.id },
          });
      
          await db.paymentDetail.delete({
            where: { id: order?.payment?.id },
          });

        const deleteOrder = await db.order.delete({
            where:{
                id: orderId
            }
        })  

        return new NextResponse(JSON.stringify(deleteOrder), {status: 200})

}

export const GET = async(req: any | NextApiRequest, res: NextApiResponse) =>{
  try {
          const orderId = req.url.split("/")[req.url.split("/").length - 1];

          if (!orderId) {
            return new NextResponse("Missing Data", { status: 400 });
          }
      
          const order = await db.order.findUnique({
            where: { id: orderId },
            include: { payment: true, shipping: true, orderItems: true },
          });
      
          return new NextResponse(JSON.stringify(order), { status: 200 });
        } catch (error) {
          console.error('Error updating payment status:', error);
          return new NextResponse("Internal Server Error", { status: 500 });
        }
}