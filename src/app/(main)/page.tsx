import Styles from "./page.module.css";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { revalidateTag } from "next/cache";
import StoreItem from "@/components/storeItem/item";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
};

const Home = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-up");
    return; 
  }

  const baseUrl = getBaseUrl();

  const APIARRAY = [
    {
      title: "RETRIEVE ALL:",
      method: "GET",
      link: `${baseUrl}/api/stores`
    },
    {
      title: "CREATE STORE:",
      method: "POST",
      link: `${baseUrl}/api/stores`,
      data: "{name: \"example-name\"}"
    },
    {
      title: "CHANGE STORE NAME:",
      method: "PUT",
      link: `${baseUrl}/api/stores/[id]`,
      data: "{name: \"example-name\"}"
    },
    {
      title: "DELETE STORE:",
      method: "DELETE",
      link: `${baseUrl}/api/stores/[id]`
    }
  ];

  let stores = [];

  try {
    const res = await fetch(`${baseUrl}/api/stores`, {
      cache: "no-cache",
      next: {
        tags: ["stores"]
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    stores = await res.json();
  } catch (error) {
    console.error('Failed to fetch stores:', error);
  }

  const loggedUser = await currentUser();
  let existUser = await db.user.findUnique({
    where: {
      clerkUserId: loggedUser?.id
    }
  });

  if (!existUser) {
    existUser = await db.user.create({
      data: {
        clerkUserId: loggedUser?.id || "",
        name: `${loggedUser?.firstName} ${loggedUser?.lastName}`,
        imageUrl: loggedUser?.imageUrl,
        email: loggedUser?.emailAddresses[0].emailAddress || ""
      }
    });
  }

  // Ensure that 'existUser.id' is valid
  if (existUser) {
    stores = stores.filter((store: any) => store.userId === existUser.id);
  }

  const createStore = async (e: FormData) => {
    "use server";
    const storeName = e.get("name")?.toString();

    try {
      await fetch(`${baseUrl}/api/stores`, {
        method: "POST",
        body: JSON.stringify({ name: storeName, userId: existUser.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      revalidateTag("stores");
    } catch (error) {
      console.error('Failed to create store:', error);
      // Handle error appropriately
    }
  };

  return (
    <main className={Styles.main}>
      <h1 className={Styles.title}>Create A New Store</h1>
      <form action={createStore}>
        <input name="name" id="name" type="text" placeholder="Store Name..." />
        <button type="submit">Create</button>
      </form>
      <div className={Styles.table}>
        <article>
          <h3>Store</h3>
          <h3>Change</h3>
        </article>
        {stores.map((store: any) => (
          <StoreItem key={store.id} userId={existUser.id} name={store.name} id={store.id} />
        ))}
      </div>
      <div className={Styles.CRUD}>
        <h1>STORE API:</h1>
        {APIARRAY.map((item: any) => (
          <article key={item.link}>
            <h1>{item.title}</h1>
            <h2>{item.method}:</h2>
            <h4>{item.link}</h4>
            {item.data && <h4>BODY: {item.data}</h4>}
          </article>
        ))}
      </div>
    </main>
  );
};

export default Home;
