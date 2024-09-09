"use server"
import { db } from "@/utils/db"

export const getCategoriesAPI = async(storeId: string | string[]) =>{
    const res = await db.category.findMany({
        where:{
            storeId: storeId as string
        }
    })

    return res;
}

export const updateCategoryAPI = async(storeId: string | string[], id: string, newname: string) =>{
    const res = await db.category.update({
        where:{
            id: id,
            storeId: storeId as string
        },
        data:{
            name: newname
        }
    })

    return res
}

export const deleteCategoryAPI = async(storeId: string | string[], id: string) => {
    const res = await db.category.delete({
        where:{
            id: id,
            storeId: storeId as string
        }
    });

    return res;
}

export const createCategoryAPI = async(storeId: string | string[], name: string) =>{
    const res = await db.category.create(
        {
            data:{
                name: name,
                storeId: storeId as string
            }
        }
    );

    return res;
}