"use server"

import { db } from "@/utils/db"
import { auth } from "@clerk/nextjs/server"

export const createProductAPI = async (
    name: string,
    featured: boolean,
    sizes: any,
    images: any,
    categories: any,
    colors: any,
    storeId: string | string[],
    quantity: number,
    price: number,
    description: string
  ) => {
    try {
      const { userId } = auth();  
      if (!userId) {
        console.error("User not authenticated");
        return { message: "User not authenticated" };
      }
  
      const user = await db.user.findFirst({
        where: {
          clerkUserId: userId
        }
      });  
      if (!user) {
        return { message: "User not found" };
      }
  
      if (!name || !categories || !sizes || !colors || !images || !quantity || !price || !description) {
        return { message: "Missing Data" };
      }
  
      const resolvedImages = await Promise.all(images);
      const imageIds = resolvedImages.map((image: any) => {
        return {id: image.id}
        });
  
      const requestBody = {
        name,
        categories,
        userId: user.id,
        sizes,
        colors,
        images: imageIds, 
        featured,
        quantity,
        price,
        description
      };
  
      const response = await fetch(`http://localhost:3000/api/stores/${storeId}/products`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        return { message: "Failed to create product", error: errorText };
      }
  
      const jsonResponse = await response.json();
  
      return jsonResponse;
    } catch (error:any) {
      console.error('Error creating product:', error);
      return { message: "Internal Server Error", error: error.message };
    }
  };

export const getProductsAPI = async(storeId: string | string[]) =>{
  const res = await fetch(`http://localhost:3000/api/stores/${storeId}/products`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const products = await res.json();

  return products;

}

export const getProductAPI = async(storeId: string | string[],productId: string | string[]) =>{
  const res = await fetch(`http://localhost:3000/api/stores/${storeId}/products/${productId}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const products = await res.json();

  return products;
}

export const updateProductAPI = async (
  name: string,
  featured: boolean,
  sizes: any,
  images: any,
  categories: any,
  colors: any,
  storeId: string | string[],
  quantity: number,
  price: number,
  description: string,
  productId: string[] | string
) => {
  try {
    const { userId } = auth();  
    if (!userId) {
      console.error("User not authenticated");
      return { message: "User not authenticated" };
    }

    const user = await db.user.findFirst({
      where: {
        clerkUserId: userId
      }
    });  
    if (!user) {
      return { message: "User not found" };
    }

    const resolvedImages = await Promise.all(images);
    const imageIds = resolvedImages.map((image: any) => {
      return {id: image.id}
      });

    const requestBody = {
      name,
      categories,
      userId: user.id,
      sizes,
      colors,
      images: imageIds, 
      featured,
      quantity,
      price,
      description
    };

    const response = await fetch(`http://localhost:3000/api/stores/${storeId}/products/${productId}`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from server:', errorText);
      return { message: "Failed to create product", error: errorText };
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error:any) {
    console.error('Error creating product:', error);
    return { message: "Internal Server Error", error: error.message };
  }
};