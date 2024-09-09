"use server"

import { db } from "@/utils/db";

export const getOrdersAPI = async(storeId: string | string[]) =>{
    const res = await db.order.findMany({
        where:{
            storeId: storeId as string
        }
    });

    return res;
}

export const deleteOrderAPI = async(storeId: string | string[], orderId: string) => {
    const res = await db.order.delete({
        where:{
            storeId: storeId as string,
            id: orderId
        }
    });

    return res;
}

export const changeStatusAPI = async(storeId: string | string[], orderId: string, newStatus: string) =>{
    const res = await db.order.update({
        where:{
            storeId: storeId as string,
            id: orderId
        },
        data:{
            status: newStatus
        }
    })

    return res;
}

export const getOrderAPI = async(storeId: string | string[], orderId: string | string[]) =>{
    const res = await db.order.findFirst({
        where:{
            storeId: storeId as string,
            id: orderId as string
        }
    });

    return res;
}