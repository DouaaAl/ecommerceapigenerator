"use client"
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Styles from "./colors.module.css"
import { deleteColorAPI, updateColorAPI } from '@/actions/color'

const row = (info:any) => {

  const [newname, setNewname] = useState("");
  const [change, setChange] = useState(false);

  const changeName = async()=>{
    if(newname == ""){
      return ""
    }
    const updatedName = await updateColorAPI(info.storeId, info.id, newname);
    await info.getColors();
    setChange(false);
  }

  const deleteColor = async()=>{
      const deltedItem = await deleteColorAPI(info.storeId, info.id);

      await info.getColors();
  }

  return (
    <div>
      {
        !change && <h3>{info.name}</h3>
      }

      {
        change && <input onChange={(e)=> setNewname(e.target.value)} value={newname} type="text" />
      }

      {
        !change && <h3>
                    <Image
                    onClick={()=>deleteColor()}
                        src="/delete.png"
                        height={30}
                        width={30}
                        alt='delete'
                    />
                    <Image
                    onClick={()=>{
                      setChange(true);
                    }}
                        src="/update.png"
                        height={30}
                        width={30}
                        alt='update'
                    />
                </h3>
      }

      {
        change && <h3>
          <button onClick={()=>changeName()}>Submit</button>
        </h3>
      }
                
                
            </div>
  )
}

export default row