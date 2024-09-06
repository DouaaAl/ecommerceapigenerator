"use client"
import React, { useEffect, useState } from 'react'
import Styles from "./sizes.module.css"
import Row from "./row"
import { createSizeAPI, getSizesAPI } from '@/actions/size'
import { useParams } from 'next/navigation'

const page = () => {

  const params = useParams().storeId;
  const [sizes, setSizes] = useState([]);
  const [newname, setNewname] = useState("")

  const APIARRAY = [
    {
      title: "RETREIVE ALL:",
      method: "GET",
      link:`http://localhost:3000/api/stores/${params}/sizes`
    },
    {
      title: "CREATE SIZE:",
      method: "POST",
      link: `http://localhost:3000/api/stores/${params}/sizes`,
      data: "{name: \"example-name\"}"
    },
    {
      title: "CHANGE SIZE:",
      method: "PUT",
      link: `http://localhost:3000/api/stores/${params}/sizes/[id]`,
      data: "{name: \"example-name\"}"
    },
    {
      title: "DELETE SIZE:",
      method: "DELETE",
      link: `http://localhost:3000/api/stores/${params}/sizes/[id]`
    }
  ]
  const getSizes = async() =>{
    const sizesapi = await getSizesAPI(params);

    setSizes(sizesapi);
  }

  const createSize = async(e: any) =>{
    e.preventDefault();
    console.log("clicked");
    if (!newname){
      return;
    }
    const newsize = await createSizeAPI(params, newname);
    console.log(newsize);
    await getSizes();
  }

  useEffect(()=>{
    getSizes();
  },[])

  return (
    <section className={Styles.sizes}>
    <h1 className={Styles.title}>Sizes</h1>
    <form onSubmit={createSize} action="">
      <input onChange={(e)=> setNewname(e.target.value)} value={newname} type="text" placeholder='Sizes' />
      <button type='submit'>Create</button>
    </form>
    <div className={Styles.table}>
      <article>
        <h3>Name</h3>
        <h3>Change</h3>
      </article>
      {sizes.map((size: any)=>{
        return <Row getSizes={getSizes} storeId={size?.storeId} id={size?.id} name={size?.name} />
      })}
    </div>
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
  </section>
  )
}

export default page