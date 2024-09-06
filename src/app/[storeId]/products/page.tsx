"use client"
import React, { useEffect, useState } from 'react'
import Styles from "./products.module.css"
import { useParams } from 'next/navigation'
import { getProductsAPI } from '@/actions/product'
import Row from './row'

const page = () => {

  const storeId = useParams().storeId;
  const [products, setProducts] = useState([]);
  const APIARRAY = [
    {
      title: "RETREIVE ALL:",
      method: "GET",
      link:`http://localhost:3000/api/stores/${storeId}/products`
    },
    {
      title: "CREATE PRODUCT:",
      method: "POST",
      link: `http://localhost:3000/api/stores/${storeId}/products`,
      data:  JSON.stringify({
        "store": {
          "id": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
          "name": "Example Store",
          "userId": "user-id-123",
          "Sizes": [
            {
              "id": "size-id-1",
              "name": "Small",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
            }
          ],
          "Category": [
            {
              "id": "category-id-1",
              "name": "Electronics",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
              "Products": [
                {
                  "id": "product-id-1",
                  "name": "Smartphone",
                  "price": 699,
                  "featured": true,
                  "quantity": 50,
                  "description": "A high-end smartphone",
                  "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
                  "Sizes": [
                    {
                      "id": "size-id-1",
                      "name": "Small",
                      "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
                    }
                  ],
                  "Categories": [
                    {
                      "id": "category-id-1",
                      "name": "Electronics",
                      "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
                    }
                  ],
                  "Images": [
                    {
                      "id": "image-id-1",
                      "url": "http://example.com/image1.jpg",
                      "productId": "product-id-1"
                    }
                  ],
                  "Color": [
                    {
                      "id": "color-id-1",
                      "name": "Black",
                      "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
                    }
                  ]
                }
              ]
            }
          ],
          "Color": [
            {
              "id": "color-id-1",
              "name": "Black",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
            }
          ],
          "Order": [
            {
              "id": "order-id-1",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
              "totalAmount": 100,
              "status": "PENDING",
              "orderItems": [
                {
                  "id": "order-item-id-1",
                  "productId": "product-id-1",
                  "orderId": "order-id-1",
                  "quantity": 2,
                  "price": 50
                }
              ],
              "shipping": {
                "id": "shipping-id-1",
                "orderId": "order-id-1",
                "address": "123 Main St",
                "city": "Anytown",
                "state": "Anystate",
                "postalCode": "12345",
                "country": "USA"
              },
              "payment": {
                "id": "payment-id-1",
                "orderId": "order-id-1",
                "paymentMethod": "CREDIT_CARD",
                "status": "PENDING",
                "transactionId": "txn-id-123"
              }
            }
          ]
        }
      })
    },
    {
      title: "CHANGE PRODUCT INFO:",
      method: "PUT",
      link: `http://localhost:3000/api/stores/${storeId}/products/[id]`,
      data:  JSON.stringify({
        "store": {
          "id": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
          "name": "Example Store",
          "userId": "user-id-123",
          "Sizes": [
            {
              "id": "size-id-1",
              "name": "Small",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
            }
          ],
          "Category": [
            {
              "id": "category-id-1",
              "name": "Electronics",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
              "Products": [
                {
                  "id": "product-id-1",
                  "name": "Smartphone",
                  "price": 699,
                  "featured": true,
                  "quantity": 50,
                  "description": "A high-end smartphone",
                  "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
                  "Sizes": [
                    {
                      "id": "size-id-1",
                      "name": "Small",
                      "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
                    }
                  ],
                  "Categories": [
                    {
                      "id": "category-id-1",
                      "name": "Electronics",
                      "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
                    }
                  ],
                  "Images": [
                    {
                      "id": "image-id-1",
                      "url": "http://example.com/image1.jpg",
                      "productId": "product-id-1"
                    }
                  ],
                  "Color": [
                    {
                      "id": "color-id-1",
                      "name": "Black",
                      "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
                    }
                  ]
                }
              ]
            }
          ],
          "Color": [
            {
              "id": "color-id-1",
              "name": "Black",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab"
            }
          ],
          "Order": [
            {
              "id": "order-id-1",
              "storeId": "1a2b3c4d-5678-90ab-cdef-1234567890ab",
              "totalAmount": 100,
              "status": "PENDING",
              "orderItems": [
                {
                  "id": "order-item-id-1",
                  "productId": "product-id-1",
                  "orderId": "order-id-1",
                  "quantity": 2,
                  "price": 50
                }
              ],
              "shipping": {
                "id": "shipping-id-1",
                "orderId": "order-id-1",
                "address": "123 Main St",
                "city": "Anytown",
                "state": "Anystate",
                "postalCode": "12345",
                "country": "USA"
              },
              "payment": {
                "id": "payment-id-1",
                "orderId": "order-id-1",
                "paymentMethod": "CREDIT_CARD",
                "status": "PENDING",
                "transactionId": "txn-id-123"
              }
            }
          ]
        }
      })
    },
    {
      title: "DELETE PRODUCT:",
      method: "DELETE",
      link: `http://localhost:3000/api/stores/${storeId}/products/[id]`
    }
  ]

  const getProducts = async() =>{
    const res = await getProductsAPI(storeId);
    setProducts(res);
  }
  useEffect(()=>{
    getProducts();
  },[])

  return (
    <section className={Styles.products}>
      <h1 className={Styles.title}>Products</h1>
      <form action="#">
        <input type="text" placeholder='product name' />
        <button>Search</button>
      </form>
      <div>
        <article className={Styles.table}>
          <div>
            <h3>Name</h3>
            <h3>Categories</h3>
            <h3>Colors</h3>
            <h3>Images</h3>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <h3>Featured</h3>
            <h3>Change</h3>
          </div>
          {
            products?.map((product: any)=>{
              return <Row id={product.id} images={product.Images} colors={product.Color} categories={product.Categories} storeId={storeId} featured={product.featured} quantity={product.quantity} price={product.price} name={product.name} getProducts={getProducts} />
            })
          }
        </article>
      </div>
      <div className={Styles.CRUD}>
          <h1>PRODUCTS API:</h1>
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