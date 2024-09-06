"use server"

export const createImageAPI = async(url: string, storeId: string | string[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/images`,{
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({url})
    })
    const image = await res.json();
    return image;
}

export const getImagesIdAPI = async(storeId: string | string[]) =>{
    
}