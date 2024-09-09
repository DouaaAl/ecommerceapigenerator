"use server"

import { db } from "@/utils/db"

export const getSizesAPI = async(storeId: String | String[]) =>{
    const res = await db.size.findMany({
        where:{
            storeId: storeId as string
        }
    })

    return res;
}

export const updateSizeAPI = async(storeId: String | String[], id: string, newname : string) => {
    const res = await db.size.update({
        where:{
            id: id,
            storeId: storeId as string
        },
        data:{
            name: newname
        }
    })

    return res;
}

export const deleteSizeAPI = async(storeId: String | String[], id:string)  => {
    const res = await db.size.delete({
        where:{
            id: id,
            storeId: storeId as string
        }
    })

    return res;
}

export const createSizeAPI = async(storeId: String | String[], name: string) =>{
    const res = await db.size.create({
        data:{
            name: name,
            storeId: storeId as string
        }
    })

    return res;
}