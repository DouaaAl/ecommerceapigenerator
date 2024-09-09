"use client"
import React, {useState, useEffect} from 'react'
import Styles from "./orders.module.css"
import Row from "./row"
import { getOrdersAPI } from '@/actions/order'
import { useParams } from 'next/navigation'

const page = () => {
  const [orders, setOrders] = useState<any>([])
  const storeId = useParams().storeId;
  const APIARRAY = [
    {
      title: "RETREIVE ALL:",
      method: "GET",
      link:`http://localhost:3000/api/stores/${storeId}/orders`
    },
    {
      title: "CREATE ORDER:",
      method: "POST",
      link: `http://localhost:3000/api/stores/${storeId}/orders`,
      data: JSON.stringify({
        "totalAmount": 75,
        "status": "PENDING",
        "orderItems": [
          {
            "productId": "3e2054ae-503f-4b0f-a6bb-45de3a896e2d",
            "quantity": 48,
            "price": 40
          },
          {
            "productId": "7de0ba48-0d4a-4f7e-9bd7-cd128c31139a",
            "quantity": 17,
            "price": 90
          }
        ],
        "shippingDetail": {
          "address": "12dfdf St",
          "city": "ddxfown",
          "state": "Anystate",
          "postalCode": "12345",
          "country": "MR"
        },
        "paymentDetail": {
          "paymentMethod": "CREDIT_CARD",
          "status": "PENDING",
          "transactionId": "transaction-id-123"
        }
      })
    },
    {
      title: "CHANGE ORDER NAME:",
      method: "PUT",
      link: `http://localhost:3000/api/stores/${storeId}/orders/[id]`,
      data: JSON.stringify({
        "totalAmount": 75,
        "status": "PENDING",
        "orderItems": [
          {
            "productId": "3e2054ae-503f-4b0f-a6bb-45de3a896e2d",
            "quantity": 48,
            "price": 40
          },
          {
            "productId": "7de0ba48-0d4a-4f7e-9bd7-cd128c31139a",
            "quantity": 17,
            "price": 90
          }
        ],
        "shippingDetail": {
          "address": "12dfdf St",
          "city": "ddxfown",
          "state": "Anystate",
          "postalCode": "12345",
          "country": "MR"
        },
        "paymentDetail": {
          "paymentMethod": "CREDIT_CARD",
          "status": "PENDING",
          "transactionId": "transaction-id-123"
        }
      })
    },
    {
      title: "DELETE ORDER:",
      method: "DELETE",
      link: `http://localhost:3000/api/stores/${storeId}/orders/[id]`
    }
  ]

  const getOrders = async() =>{
    const res = await getOrdersAPI(storeId);
    setOrders(res);
  }
  useEffect(()=>{
    getOrders();
  }, [])

  return (
    <section className={Styles.orders}>
    <h1 className={Styles.title}>Orders</h1>
    <div className={Styles.table}>
      <article>
        <h3>Order Id</h3>
        <h3>Status</h3>
        <h3>Change</h3>
      </article>
      {
        orders.map((order: any)=>{
          return <Row status={order.status} storeId={storeId} getOrders={getOrders} id={order.id} />
        })
      }
    </div>
    <div className={Styles.CRUD}>
        <h1>ORDER API:</h1>
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