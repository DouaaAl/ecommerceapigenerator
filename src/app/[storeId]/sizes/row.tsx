"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { deleteSizeAPI, updateSizeAPI } from '@/actions/size';

const row = (info: any) => {

  const [change, setChange] = useState(false);
  const [newname, setNewname] = useState("")

  const deleteSize = async() =>{
    const deletedSize = await deleteSizeAPI(info.storeId, info.id);
    await info.getSizes();
  }

  const updateSize = async() =>{
    if (newname == ""){
      return;
    }

    const updatedSize = await updateSizeAPI(info.storeId, info.id, newname);
    await info.getSizes();
    setChange(false);
  }

  return (
    <article>
      {!change && <h3>{info.name}</h3>}
      {change && <input onChange={(e)=> setNewname(e.target.value)} value={newname} type="text" placeholder='New name...' />}
      {!change && <h3>
      <Image
      onClick={(e)=> deleteSize()}
        src="/delete.png"
        height={30}
        width={30}
        alt='delete'
      />
      <Image
      onClick={(e)=>setChange(true)}
        src="/update.png"
        height={30}
        width={30}
        alt='delete'
      />
    </h3>}
    {change && <button onClick={(e)=> updateSize()}>Submit</button>}
  </article>
  )
}

export default row