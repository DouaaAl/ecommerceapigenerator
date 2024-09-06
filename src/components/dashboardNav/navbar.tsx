"use client"
import React from 'react'
import Styles from "@/app/[storeId]/dashboard.module.css"
import { useParams } from 'next/navigation';

const navbar = () => {

    const params = useParams().storeId;
  return (
    <nav className={Styles.subNav}>
        <a href={`/${params}/categories`}  rel="noopener noreferrer">categories</a>
        <a href={`/${params}/products`}   rel="noopener noreferrer">products</a>
        <a href={`/${params}/sizes`}   rel="noopener noreferrer">sizes</a>
        <a href={`/${params}/colors`}  rel="noopener noreferrer">colors</a>
        <a href={`/${params}/orders`}  rel="noopener noreferrer">orders</a>
        <a href={`/${params}/createProduct`}  rel="noopener noreferrer">create product</a>
      </nav>
  )
}

export default navbar