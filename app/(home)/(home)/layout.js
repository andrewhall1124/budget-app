'use client'
import { Footer, Header } from "@/app/components"
import { useEffect, useState, createContext } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/config/supabaseClient";

export const AuthContext = createContext()

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState("Blank User");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (error) {
          router.push('/login')
        } else {
          const { user, session } = data;
          setUser(user);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchUser();
  },[])


  return (
    <>
      <AuthContext.Provider value={{user}}>
        <Header/>
          <main className='flex-1 flex flex-col mt-12 mb-28'>
            {children}
          </main>
        <Footer/>
      </AuthContext.Provider>
    </>
  )
}