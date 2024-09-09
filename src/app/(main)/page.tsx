"use client"
import { createStoreServer, getUserStoresServer } from "@/actions/store";
import Styles from "./page.module.css";
import StoreItem from "@/components/storeItem/item"
import { useEffect, useState } from "react";

const Home =  () => {

  const APIARRAY = [
    {
      title: "RETREIVE ALL:",
      method: "GET",
      link:"https://ecommerceapigenerator.vercel.app/api/stores"
    },
    {
      title: "CREATE STORE:",
      method: "POST",
      link: "https://ecommerceapigenerator.vercel.app/api/stores",
      data: "{name: \"example-name\"}"
    },
    {
      title: "CHANGE STORE NAME:",
      method: "PUT",
      link: "https://ecommerceapigenerator.vercel.app/api/stores/[id]",
      data: "{name: \"example-name\"}"
    },
    {
      title: "DELETE STORE:",
      method: "DELETE",
      link: "https://ecommerceapigenerator.vercel.app/api/stores/[id]"
    }
  ]

  const [stores, setStores] = useState<any>([]);
  const [name, setName] = useState<string>("");

  const getUserStores = async() =>{
    const res: any = await getUserStoresServer();
    setStores(res);
  }
  const createUserStore = async() =>{
    if(name){
      const res: any = await createStoreServer(name);
      await getUserStores();

    }
  }

  useEffect(()=>{
    getUserStores()
  },[])


 
  return (
    <main className={Styles.main}>
      <h1 className={Styles.title}>Create A new Store</h1>
      <form onSubmit={(e)=> e.preventDefault()} >
        <input value={name} onChange={(e)=> setName(e.target.value)} name="name" id="name" type="text" placeholder="Store Name..." />
        <button onClick={() => createUserStore()}>Create</button>
      </form>
      <div className={Styles.table}>
        <article>
          <h3>Store</h3>
          <h3>Change</h3>
        </article>
        {stores?.map((store: any) => (
          <StoreItem getUserStores={getUserStores} name={store.name} id={store.id} />
        ))}
      </div>
      <div className={Styles.CRUD}>
        <h1>STORE API:</h1>
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
    </main>
  );
};

export default Home;