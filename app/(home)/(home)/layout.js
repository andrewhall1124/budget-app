'use client'
import { Footer, Header } from "@/app/components"
import { useEffect, useState } from "react";
import { supabase } from "@/app/config/supabaseClient";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const [user,setUser] = useState(null)
  const router = useRouter()

  const getSession = async () =>{
    try{
      const {data, error} = await supabase.auth.refreshSession();
      if(error){
        console.log("Error:",error)
        router.push("./login")
      }
      else{
        const {user, session} = data
        setUser(user)
        console.log("Success", data)
      }
    }
    catch{
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    getSession();
  }, []);


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