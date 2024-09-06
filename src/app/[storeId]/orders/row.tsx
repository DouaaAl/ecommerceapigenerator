import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { changeStatusAPI, deleteOrderAPI } from '@/actions/order';

const row = (info: any) => {
  const [change, setChange] =useState(false);
  const [status, setStatus] = useState("");

  const deleteOrder = async() =>{
    const item = await deleteOrderAPI(info.storeId, info.id);

    await info.getOrders();
  }

  const updateOrder = async() =>{
    if (status == ""){
      return;
    }
    const item = await changeStatusAPI(info.storeId, info.id, status);

    await info.getOrders();
    setChange(false);
  }
  
  return (
    <article>
    <h3>{info.id}</h3>
    {
      !change && <h3>{info.status}</h3>
    }
    
    {
      change && <select onChange={(e)=>setStatus(e.target.value)} value={status} name="" id="">
        <option value="">Status</option>
      <option value="PENDING">Pending</option>
      <option value="SENT">Sent</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
    }
    
    {
      !change && <h3>
      <Image
      onClick={(e)=>deleteOrder()}
        src="/delete.png"
        height={30}
        width={30}
        alt='delete'
      />
      <Image
      onClick={()=>setChange(true)}
        src="/update.png"
        height={30}
        width={30}
        alt='update'
      />
      <a href={`/${info.storeId}/orders/${info.id}`}  rel="noopener noreferrer">
        <Image
          src="/eye.png"
          height={30}
          width={30}
          alt='pdf'
        />
      </a>
    </h3>
    }

    {
      change && <button onClick={()=>updateOrder()}>submit</button>
    }
    
  </article>
  )
}

export default row