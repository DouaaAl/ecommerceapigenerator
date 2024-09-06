"use server"

export const deleteStore = async (id: any, userId: any) =>{
    const deleteServer = await fetch(`http://localhost:3000/api/stores/${id}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({userId, id})
    })
}

export const updateStore = async(id: any, userId: any, name: any) =>{
    const updatedServer = await fetch(`http://localhost:3000/api/stores/${id}`,{
        cache: 'no-cache',
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({userId, id, name})
    })
}