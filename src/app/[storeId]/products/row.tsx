"use client"
import React, {useEffect, useState} from 'react'
import Styles from "./products.module.css"
import Image from 'next/image'

const row = (info: any) => {

  return (
    <div>
    <h3>{info.name}</h3>
    <h3>{
        info.categories.map((category: any)=>{
          return <h5>{category.name}</h5>
        })
      }</h3>
      <h3>{
        info.colors?.map((color: any)=>{
          return <h5>{color.name}</h5>
        })
      }</h3>
    <h3>{
        info.images.map((image:any)=>{
          return <Image
            src={image.url}
            height={50}
            width={100/info.images.length}
            alt="images"
          />
        })
      }</h3>
    <h3>{info.price}</h3>
    <h3>{info.quantity}</h3>
    <h3>{info.featured ?"True" : "False"}</h3>
    <h3><a href={`/${info.storeId}/createProduct/${info.id}`}  rel="noopener noreferrer">
      <Image
        src="/update.png"
        height={30}
        width={30}
        alt='update'
      />
    </a></h3>
  </div>
  )
}

export default row