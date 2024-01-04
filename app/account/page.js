'use client'
import { Button, Card, CardTitle } from "@/app/components";
import { supabase } from "@/app/config/supabaseClient";
import { useRouter } from "next/navigation";

export default function Page(){
  const router = useRouter()

  const logout = async () =>{
    try{
      const { error } = await supabase.auth.signOut()

      if(error){
        console.log("Error logging out user:",error)
      }
      else{
        console.log("User logged out successfully")
        router.push('login')
      }
    }
    catch(error){
      console.log("Error:",error.message)
    }
  }

  return(
    <>
      <div>
        <Card>
          <CardTitle>Account</CardTitle>
          <Button onClick={logout}>Log out</Button>
        </Card>
      </div>
    </>
  )
}