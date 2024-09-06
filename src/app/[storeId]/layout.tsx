"use server"
import React, {useEffect, useState} from 'react'
import Styles from "./dashboard.module.css"
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import Navbar from '@/components/dashboardNav/navbar';



const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const {userId} = auth()

  if(!userId){
    return redirect("/sign-up");
  }


  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default layout