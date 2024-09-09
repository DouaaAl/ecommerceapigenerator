"use server"

import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export const getUserId = async()=>{
    const loggedUser = await currentUser();
    const userDB: any = await db.user.findFirst({
        where:{
            clerkUserId: loggedUser?.id
        }
    })
    
    return userDB
}

export const createStoreServer = async(name: string) =>{
    const userDB = await getUserId();
    if (userDB){
        const stores = await db.store.create({
            data:{
                name,
                userId: userDB.id
            }
        })
        return stores;
    }
}

export const getUserStoresServer = async() =>{
    const loggedUser = await currentUser();
    const userDB: any = await db.user.findFirst({
        where:{
            clerkUserId: loggedUser?.id
        }
    })
    const stores = await db.store.findMany({
        where: {
            userId: userDB.id
        }
    })

    return stores;
}

export const deleteStore = async (id: string) =>{
    const user = await getUserId();
    const deletedStore = await db.store.delete({
        where: {
            id: id,
            userId: user.id
        }
    })

    return deletedStore;
}

export const updateStore = async(id: string, name: string) =>{
    const updatedStore = await db.store.update({
        where: {
            id: id,
        },
        data: {
            name: name
        }
    })

    return updatedStore;
}