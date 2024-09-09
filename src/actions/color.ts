"use server"

import { db } from "@/utils/db";

export const getColorsAPI = async(storeId: String | String[]) =>{
    const res = await db.color.findMany({
        where:{
            storeId: storeId as string
        }
    });

    return res;
}


export const createColorAPI = async(storeId: String | String[], name: string) =>{
    const res = await db.color.create({
        data:{
            name: name,
            storeId: storeId as string
        }
    })

    return res;
}

export const updateColorAPI = async(storeId: String | String[], id: string, newname: string) =>{
    const color = await db.color.update({
        where: {
            id: id,
            storeId: storeId as string
        },
        data:{
            name: newname
        }
    })

    return color
}

export const deleteColorAPI = async(storeId: string | string[], id: string)=>{
    const res = await db.color.delete({
        where:{
            storeId: storeId as string,
            id: id
        }
    });

    return res;
}