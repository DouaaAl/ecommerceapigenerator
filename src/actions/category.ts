"use server"
import { auth } from "@clerk/nextjs/server"
import { revalidateTag } from "next/cache"

export const getCategoriesAPI = async(storeId: string | string[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/categories`,{
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
          }
    })
    const categories = await res.json();
    return categories;
}

export const updateCategoryAPI = async(storeId: string | string[], id: string, newname: string) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/categories/${id}`,{
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({id, newname})
    })
    return res.json();
}

export const deleteCategoryAPI = async(storeId: string | string[], id: string) => {
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/categories/${id}`,{
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({id})
    })
    return res.json();
}

export const createCategoryAPI = async(storeId: string | string[], name: string) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/categories`,{
        method: 'POST',
        cache: 'no-cache',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    })

    return res.json();
}