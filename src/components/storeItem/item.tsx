"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import {deleteStore, updateStore} from "@/actions/store"
import {  useRouter } from 'next/navigation'

interface item {
    id: string,
    name: string,
    getUserStores: Function
}

const item = ({id, name, getUserStores}: item) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [newname, setNewname] = useState("");
    const [error, setError] = useState({
        msg: "",
        err: false
    })

    const router = useRouter();
    const deleteItem = async() =>{
        const deleletedStore = await deleteStore(id);
        await getUserStores();
    }

    const updateItem = async() =>{
        if (!name){
            setError({
                msg: "Store already exists",
                err: true
            })
            setIsUpdate(false);
            return;
        }
        const changeName = await updateStore(id, newname);
        await getUserStores();
        setIsUpdate(false);
    }

  return (
    <article key={id}>
    {!isUpdate && <h3>{name}</h3>}
    {isUpdate &&    <h3><input value={newname} onChange={(e)=>setNewname(e.target.value)} type="text" /></h3> }
{!isUpdate && <h3>                
    <Image 
    onClick={deleteItem}
        src='/delete.png'
        height={30}
        width={30}
        alt='delete'
    />
    <Image
    onClick={()=>setIsUpdate(true)}
        src='/update.png'
        height={30}
        width={30}
        alt='update'
    />
    <a href={`/${id}/categories`}  rel="noopener noreferrer">
    <Image
        src='/eye.png'
        height={30}
        width={30}
        alt='dashboard'
    />
    </a>
     </h3>}
    
        {
            isUpdate && (        
        <h3>
        <button onClick={updateItem}>Change</button>
        </h3>
        )
    }
  </article>
  )
}

export default item