"use server"

export const getSizesAPI = async(storeId: String | String[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/sizes`);
    const sizes = await res.json()
    

    return sizes;
}

export const updateSizeAPI = async(storeId: String | String[], id: String, newname : String) => {
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/sizes/${id}`,{
        cache: 'no-cache',
        body: JSON.stringify({newname}),
        method: 'PUT'
    })
    return res.json();
}

export const deleteSizeAPI = async(storeId: String | String[], id:String)  => {
    const res =  await fetch(`http://localhost:3000/api/stores/${storeId}/sizes/${id}`,{
        cache: 'no-cache',
        method: "DELETE",
        body: JSON.stringify({})
    })

    return res.json();
}

export const createSizeAPI = async(storeId: String | String[], name: String) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/sizes`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({name: name})
    })

    return res.json()
}