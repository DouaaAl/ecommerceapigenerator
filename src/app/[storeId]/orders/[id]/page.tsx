"use client"
import React, {useEffect, useState, useRef} from 'react'
import Styles from "./bill.module.css"
import { getOrderAPI } from '@/actions/order';
import { useParams } from 'next/navigation';
import jsPDF from "jspdf"
import html2canvas from "html2canvas"




const page = () => {

    const bill = useRef(null)
    const [order, setOrder] = useState({
        totalAmount: 0,
        id: "",
        payment: {
            paymentMethod: ""
        },
        status: "",
        shipping:{
            city: "",
            address: "",
            country: ""
        },
        orderItems: [{
            productId: "",
            price: 0,
            quantity: 0
        }]
    });
    const {storeId, id} = useParams();

    const getOrder = async()=>{
        let res: any = await getOrderAPI(storeId, id);

        setOrder(res);
    }

    const createPdf = async() =>{
        const inputData = bill.current;
        try {
            if(inputData){
                const canvas = await html2canvas(inputData);
                const imgData = canvas.toDataURL("image/png");

                const pdf = new jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: "a4"
                })

                const width = pdf.internal.pageSize.getWidth();
                const height = (canvas.height * width) / canvas.width;
                pdf.addImage(imgData, "PNG", 0, 0,width, height)
                pdf.save("Landscape.pdf")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getOrder();
    }, [])

  return <div ref={bill} className={Styles.invoice}>
  <h1 className={Styles.title}>Order Bill</h1>
  <article className={Styles.table2Row}>
        <div className={Styles.col}>Order Id: {order.id}</div>
        <div className={Styles.col}>User Address: {order?.shipping?.country}, {order?.shipping?.city}, {order?.shipping?.address}</div>
  </article>

  <article className={Styles.table}>
    <div className={Styles.row}>
        <div className={Styles.col}>Product Id</div>
        <div className={Styles.col}>Product Price</div>
        <div className={Styles.col}>Product Quantity</div>
        <div className={Styles.col}>Total</div>
    </div>
    {
        order?.orderItems?.map((item:any)=>{

            return  <div className={Styles.row}>
            <div className={Styles.col}>{item.id}</div>
            <div className={Styles.col}>{item.price}</div>
            <div className={Styles.col}>{item.quantity}</div>
            <div className={Styles.col}>{item.price * item.quantity}</div>
        </div>
        })
    }
  </article>

  <article className={Styles.table2Row}>
        <div className={Styles.col}>Payment Method: {order?.payment?.paymentMethod}</div>
        <div className={Styles.col} >Total: {order.totalAmount}</div>
        <div className={Styles.col} >Status: {order?.status}</div>
  </article>

  <button onClick={()=>createPdf()} className={Styles.btn}>Download Bill</button>
</div>
}

export default page