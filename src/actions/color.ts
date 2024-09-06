"use server"

export const getColorsAPI = async(storeId: String | String[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/colors`);
    const colors = await res.json()
    

    return colors;
}


export const createColorAPI = async(storeId: String | String[], name: String) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/colors`,{
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({name})
    });
    const color = await res.json()
    

    return color;
}

export const updateColorAPI = async(storeId: String | String[], id: string, newname: string) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/colors/${id}`,{
        method: 'PUT',
        cache: 'no-cache',
        body: JSON.stringify({newname})
    });
    const color = await res.json()
    

    return color;
}

export const deleteColorAPI = async(storeId: string | string[], id: string)=>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/colors/${id}`,{
        method: 'DELETE',
        cache: 'no-cache',
        body: JSON.stringify({})
    });
    const color = await res.json()
    

    return color;
}