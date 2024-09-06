import Styles from "./page.module.css";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { revalidateTag } from "next/cache";
import StoreItem from "@/components/storeItem/item"

const Home = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
  }

  const APIARRAY = [
    {
      title: "RETREIVE ALL:",
      method: "GET",
      link:"http://localhost:3000/api/stores"
    },
    {
      title: "CREATE STORE:",
      method: "POST",
      link: "http://localhost:3000/api/stores",
      data: "{name: \"example-name\"}"
    },
    {
      title: "CHANGE STORE NAME:",
      method: "PUT",
      link: "http://localhost:3000/api/stores/[id]",
      data: "{name: \"example-name\"}"
    },
    {
      title: "DELETE STORE:",
      method: "DELETE",
      link: "http://localhost:3000/api/stores/[id]"
    }
  ]
  const res = await fetch("http://localhost:3000/api/stores", {
    cache: "no-cache",
    next: {
      tags: ["stores"]
    }
  });

  let stores = await res.json();

  const loggedUser = await currentUser();
  let existUser = await db.user.findUnique({
    where:{
      clerkUserId: loggedUser?.id
    }
  })

  if(!existUser){
    existUser= await db.user.create({
      data: {
        clerkUserId: loggedUser?.id || "",
        name: `${loggedUser?.firstName} ${loggedUser?.lastName}`,
        imageUrl: loggedUser?.imageUrl,
        email: loggedUser?.emailAddresses[0].emailAddress || ""
      }
    })
  }
  stores = stores.filter((store: any) => store.userId == existUser?.id);


  const createStore = async (e: FormData) => {
    "use server";
    const storeName = e.get("name")?.toString();
    await fetch("http://localhost:3000/api/stores", {
      method: "POST",
      body: JSON.stringify({ name: storeName, userId: existUser.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("stores");
  };

  return (
    <main className={Styles.main}>
      <h1 className={Styles.title}>Create A new Store</h1>
      <form action={createStore}>
        <input name="name" id="name" type="text" placeholder="Store Name..." />
        <button>Create</button>
      </form>
      <div className={Styles.table}>
        <article>
          <h3>Store</h3>
          <h3>Change</h3>
        </article>
        {stores.map((store: any) => (
          <StoreItem userId={existUser.id} name={store.name} id={store.id} />
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