"use client"
import React, { useEffect, useState } from 'react'
import Styles from "./categories.module.css"
import Row from './row'

import { useParams } from 'next/navigation'
import { getCategoriesAPI, createCategoryAPI } from '@/actions/category'

const page = () => {

  const [categories, setCategories] = useState<any>([]);
  const [name, setName] = useState("");
  const params = useParams().storeId;
  const APIARRAY = [
    {
      title: "RETREIVE ALL:",
      method: "GET",
      link:`https://ecommerceapigenerator.vercel.app/api/stores/${params}/categories`
    },
    {
      title: "CREATE CATEGORY:",
      method: "POST",
      link: `https://ecommerceapigenerator.vercel.app/api/stores/${params}/categories`,
      data: "{name: \"example-name\"}"
    },
    {
      title: "CHANGE CATEGORY NAME:",
      method: "PUT",
      link: `https://ecommerceapigenerator.vercel.app/api/stores/${params}/categories/[id]`,
      data: "{name: \"example-name\"}"
    },
    {
      title: "DELETE CATEGORY:",
      method: "DELETE",
      link: `https://ecommerceapigenerator.vercel.app/api/stores/${params}/categories/[id]`
    }
  ]
  
  const getCategories = async() =>{
    const res = await getCategoriesAPI(params);
    setCategories(res);
  }
  const createCategory = async(e: any) =>{
    e.preventDefault();
    if(name == ""){
      return;
    }
    const res = await createCategoryAPI(params, name);
    getCategories();
  }

  useEffect(()=>{
    getCategories();
  },[])


  return (
    <section className={Styles.categories}>
      <h1 className={Styles.title}>Categories</h1>
      <form onSubmit={createCategory} action="">
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Category' />
        <button>Create</button>
      </form>
      <div className={Styles.table}>
        <article>
          <h3>Name</h3>
          <h3>Change</h3>
        </article>
        {categories?.map((category: any) =>{
          return <Row getCategories={getCategories} storeId={params} id={category.id} name={category.name} />
        })}
      </div>
      <div className={Styles.CRUD}>
        <h1>CATEGORY API:</h1>
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