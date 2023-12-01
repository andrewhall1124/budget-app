'use client'
import { Footer, Header } from "@/app/components"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getUser from "@/app/services/getUser";

export default function Layout({ children }) {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if(!user){
      router.push("/login")
    }
  }, [user]);


  return (
    <>
      <Header/>
        <main className='flex-1 flex flex-col mt-12 mb-28'>
          {children}
        </main>
      <Footer/>
    </>
  )
}