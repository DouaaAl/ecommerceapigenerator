"use server"
import sharp from 'sharp';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db';

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
      accessKeyId:process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    }
  })


export const uploadFiletoS3 = async (base64String: string) => {
    try {
        console.log("inside uploadFile :", base64String);
        const buffer = Buffer.from(base64String, 'base64');
        let fileId = await uuidv4();
        
        const fileBuffer = await sharp(buffer)
        .jpeg({ quality: 80 })
        .resize(1600, 1600)
        .toBuffer();
        const params = {
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
            Key: fileId,
            Body: fileBuffer,
            ContentType: "image/jpg"
        }
        
        const command = new PutObjectCommand(params);
        
        try {
            const response = await s3Client.send(command);
            let imageLink = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${fileId}`;
            console.log("image link :", imageLink);
        return imageLink;
    } catch (error) {
        console.log(error);
    }
    
} catch (error) {
    console.error('Error processing image with sharp:', error);
    throw error; 
}
};

export const createImageAPI = async(url: string, storeId: string | string[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/images`,{
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({url})
    })
    const image = await res.json();
    return image;
}