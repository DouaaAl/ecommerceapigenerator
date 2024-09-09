"use client"
import React, {useState, useEffect} from 'react'
import Styles from "./colors.module.css"
import Row from './row'
import { createColorAPI, getColorsAPI } from '@/actions/color'
import { useParams } from 'next/navigation'

const page = () => {
    const [colors, setColors] = useState<any>([]);
    const [name, setName] = useState("");
    const storeId = useParams().storeId;
    const APIARRAY = [
        {
          title: "RETREIVE ALL:",
          method: "GET",
          link:`https://ecommerceapigenerator.vercel.app/api/stores/${storeId}/colors`
        },
        {
          title: "CREATE COLOR:",
          method: "POST",
          link: `https://ecommerceapigenerator.vercel.app/api/stores/${storeId}/colors`,
          data: "{name: \"example-name\"}"
        },
        {
          title: "CHANGE COLOR NAME:",
          method: "PUT",
          link: `https://ecommerceapigenerator.vercel.app/api/stores/${storeId}/colors/[id]`,
          data: "{name: \"example-name\"}"
        },
        {
          title: "DELETE COLOR:",
          method: "DELETE",
          link: `https://ecommerceapigenerator.vercel.app/api/stores/${storeId}/colors/[id]`
        }
      ]
    const getColors = async()=>{
        const res = await getColorsAPI(storeId);
        setColors(res);
    }

    const createColor = async(e: any)=>{
        e.preventDefault();
        if(name == ""){
            return;
        }
        const newcolor = await createColorAPI(storeId, name);
        await getColors();
    }

    useEffect(()=>{
        getColors();
    },[])
  return (
    <section className={Styles.colors}>
        <h1 className={Styles.title}>Colors</h1>
        <form onSubmit={createColor}>
            <input value={name} onChange={(e:any)=>setName(e.target.value)} type="text" />
            <button>create</button>
        </form>

        <article className={Styles.table}>
            <div>
                <h3>Name</h3>
                <h3>Admin</h3>
            </div>
            {
                colors.map((color: any)=>{
                    return <Row storeId={storeId} getColors={getColors} id={color.id} name={color.name} />
                })
            }
        </article>
        <div className={Styles.CRUD}>
        <h1>COLOR API:</h1>
        {
          APIARRAY.map((item: any) =>{
            return <article>
              <h1>{item.title}</h1>
              <h2>{item.method}:</h2>
              <h4>{item.link}</h4>
              {item.data && <h4>BODY: {item.data}</h4> }
            </article>
          })
        }
      </div>
    </section>
  )
}

export default page