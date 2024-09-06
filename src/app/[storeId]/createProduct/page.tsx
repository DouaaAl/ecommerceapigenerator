"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Styles from "./product.module.css"
import { useEdgeStore } from '@/lib/edgestore';
import { getSizesAPI } from '@/actions/size';
import { redirect, useParams } from 'next/navigation';
import { getCategoriesAPI } from '@/actions/category';
import { getColorsAPI } from '@/actions/color';
import { createProductAPI } from '@/actions/product';
import { createImageAPI } from '@/actions/image';
import Loading from "@/components/loading/loading"

const page = () => {
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [images, setImages]: any = useState([]);
    const [allowedImages, setAllowedImages]  = useState(["1", "2", "3", "4", "5"])
    const [data, setData]: any = useState({Sizes: [], Categories: [],  Color: [] })
    const [currentSize, setCurrentSize] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentColor, setCurrentColor] = useState("");
    const [file, setFile] = React.useState<File>();
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(false);

    const storeId = useParams().storeId;
    const {edgestore} = useEdgeStore();

    const getData = async()=>{
        if(storeId){
            const res = await getCategoriesAPI(storeId);
            const sizesres = await getSizesAPI(storeId);
            const colorsres = await getColorsAPI(storeId);
            setCategories(res);
            setSizes(sizesres);
            setColors(colorsres);
        }
    }

    const createProduct = async(e: any) =>{
        e.preventDefault()
        setLoading(true);
        const mappedSizes = data.Sizes.map((size: string)=>{
            return {id: size}
        });
        const mappedImages = images.map(async(image:string)=>{
            
            const res = await createImageAPI(image, storeId)
            return {id: res.id};
        })
        const mappedCategories = data.Categories.map((category: string)=>{
            return {id: category}
        })
        const mappedColors = data?.Color?.map((color: string)=>{
            return {id: color}
        })

        const newproduct = await createProductAPI(name, featured, mappedSizes, mappedImages, mappedCategories, mappedColors, storeId, quantity, price, description);
        setLoading(false);
    }

    // ADD DATA

    const addSize =(e: any) =>{
        e.preventDefault();
        setData({...data, Sizes:[...data.Sizes, currentSize].filter(onlyUnique)})
    }

    const addCategory =(e: any) =>{
        e.preventDefault();
        setData({...data, Categories:[...data.Categories, currentCategory].filter(onlyUnique)})
    }

    const addColor =(e: any) =>{
        e.preventDefault();
        setData({...data, Color:[...data.Color, currentColor].filter(onlyUnique)})
    }
    
    const addImage = async(e: any) =>{
        e.preventDefault()
        if(file){
            const res = await edgestore.myPublicImages.upload({
                file
            })
            setImages([...images, res.url])
            setAllowedImages(["1"]);
            setAllowedImages(["1", "2", "3", "4", "5"])
            console.log(images);
        }
    }

    // REMOVE DATA
    const removeSize =(size: string) =>{
        let index = data.Sizes.indexOf(size);
        let newSizes = data.Sizes
        newSizes?.splice(index, 1);
        setData((prev: any) =>{
            return {...prev, Sizes: newSizes}
        })
    }

    const removeCategory =(category: string) =>{
        let index = data.Categories.indexOf(category);
        let newCategories = data.Categories
        newCategories?.splice(index, 1);
        setData((prev: any) =>{
            return {...prev, Categories: newCategories}
        })
    }

    const removeColor =(color: string) =>{
        let index = data.Color.indexOf(color);
        let newColors = data.Color
        newColors?.splice(index, 1);
        setData((prev: any) =>{
            return {...prev, Color: newColors}
        })
    }
    const removeImage =(image: string) =>{
        let index = images.indexOf(image);
        let newImages = images
        newImages?.splice(index, 1);
        setAllowedImages(["1", "2", "3", "4", "5"])
        setImages(newImages);
    }

    const onlyUnique = (value: any, index: any, array: any) => {
        return array.indexOf(value) === index;
      }
      
    useEffect(()=>{
        getData();
    },[])


    if(loading){
        return <Loading />
    }

  return (
    <section className={Styles.product}>
        <div className={Styles.images}>
            {
                allowedImages.map((item, index)=>{
                    if(images[index]){
                        
                        return <article>
                            <Image
                            key={images[index]}
                                src={images[index]}
                                height={210}
                                width={200}
                                alt='image'
                            />
                            <Image
                            onClick={()=>removeImage(images[index])}
                            key={index}
                            src="/delete.png"
                            height={30}
                            width={30}
                            alt='delete'
                            />
                            </article> 
                            
                    }
                    return <div key={index} className={Styles.emptyImage}></div>
                })
            }
        </div>
        <form onSubmit={addImage}>
        <label className={Styles.custom_file_upload}>
            <input onChange={(e)=>setFile(e.target.files?.[0])} type="file"/>
            Custom Upload
        </label>
            <button style={{width: "50%"}} type='submit'>add Images</button>
        </form>
        <form onSubmit={createProduct}>
            <input onChange={(e)=>setName(e.target.value)} value={name} placeholder='Product Name' type="text" />
            <input onChange={(e)=>setPrice(parseInt(e.target.value))} value={price} placeholder='Price' type="number" name="" id="" />
            <input value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))} placeholder='Quantity' type="number" />
            <button>Add product</button>
        </form>

        <div className={Styles.addData}>

        <form onSubmit={addSize}>
            <div>
                <select value={currentSize} onChange={(e)=>setCurrentSize(e.target.value)} name="" id="">
                    <option value="">Size</option>
                    {sizes.map((size: any)=>{
                        return <option value={size.id}>{size?.name}</option>
                    })}
                </select>
                <button>Add Size</button>
            </div>
            <article>
                {data.Sizes.map((item: any)=>{
                    let name = "";
                    sizes.forEach((size: any)=>{
                        if(size.id == item){
                            name = size.name;
                        }
                    })
                    return <div>
                        <h3>{name}</h3>
                        <h3 onClick={()=> removeSize(item)}><Image
                            src="/delete.png"
                            width={30}
                            height={30}
                            alt='delete'
                        /></h3>
                    </div>
                })}
                <h3>

                </h3>
            </article>
        </form>
        <form onSubmit={addCategory}>
            <div>
                <select value={currentCategory} onChange={(e)=> setCurrentCategory(e.target.value)} name="" id="">
                    <option value="">Category</option>
                    {categories.map((category: any)=>{
                        return <option value={category.id}>{category.name}</option>
                    })}
                </select>
                <button>Add Category</button>
            </div>
            <article>
                {data.Categories.map((item: any)=>{
                    let name = "";
                    categories.forEach((category: any)=>{
                        if(category.id == item){
                            name = category.name;
                        }
                    })
                    return <div>
                        <h3>{name}</h3>
                        <h3 onClick={()=> removeCategory(item)}><Image
                            src="/delete.png"
                            width={30}
                            height={30}
                            alt='delelte'
                        /></h3>
                    </div>
                })}
                <h3>

                </h3>
            </article>
        </form>

        <form onSubmit={addColor}>
            <div>
                <select onChange={(e)=> setCurrentColor(e.target.value)} value={currentColor} name="" id="">
                    <option value="">Color</option>
                    {colors.map((color: any)=>{
                        return <option value={color.id}>{color.name}</option>
                    })}
                </select>
                <button>Add Color</button>
            </div>
            <article>
                {data.Color.map((item: any)=>{
                    let name = "";
                    colors.forEach((color: any)=>{
                        if(color.id == item){
                            name = color.name;
                        }
                    })
                    return <div>
                        <h3>{name}</h3>
                        <h3 onClick={()=> removeColor(item)}><Image
                            src="/delete.png"
                            width={30}
                            height={30}
                            alt='delelte'
                        /></h3>
                    </div>
                })}
                <h3>

                </h3>
            </article>
        </form>
        </div>
        <form className={Styles.lastForm}>
            <select onChange={(e)=>{
                if(e.target.value == "featured"){
                    setFeatured(true);
                }
                else{
                    setFeatured(false);
                }
            }} name="" id="">
                <option value="">Select</option>
                <option value="featured">Featured</option>
                <option value="not">Not Featured</option>
            </select>
            <textarea onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='Description...' name="" id=""></textarea>
        </form>
    </section>
  )
}

export default page