"use client"
import React, { useState } from 'react'
import Styles from "./categories.module.css"
import Image from 'next/image'
import { deleteCategoryAPI, updateCategoryAPI } from '@/actions/category'
import { useRouter } from 'next/navigation'


const row = (info: any) => {

  const [change, setChange] = useState(false);
  const [newname, setNewname] = useState(info.name);

  const changeName = async() =>{
    if(newname == ""){
      setChange(false);
      return;
    }
    const category = await updateCategoryAPI(info.storeId, info.id, newname);
    await info.getCategories();
    setChange(false);
    }

  const deleteCategory = async() =>{
    const category = await deleteCategoryAPI(info.storeId, info.id);
    console.log(category)
    await info.getCategories()
    setChange(false);
  }

  return (
    <article>
      {!change && <h3>{info.name}</h3>}
    {change && <input onChange={(e)=> setNewname(e.target.value
    )} value={newname} type="text" placeholder='Name...' />}
    {!change &&     <h3>
      <Image
      onClick={(e)=> deleteCategory()}
        src="/delete.png"
        height={30}
        width={30}
        alt='delete'
      />
      <Image onClick={(e)=> setChange(true)}
        src="/update.png"
        height={30}
        width={30}
        alt='delete'
      />
    </h3>}
    {change && <h3>
      <button onClick={changeName}>Submit</button>
    </h3>}
    

  </article>
  )
}

export default row