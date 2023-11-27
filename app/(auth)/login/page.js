'use client'
import Link from "next/link";
import { Card, CardTitle, TextQuestion, Button } from "../../components";
import { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { useRouter } from "next/navigation";

export default function Page(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () =>{
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if(error){
        console.log("Error logging in user:",error)
      }
      else{
        console.log("User logged in successfully:", data)
        router.push('/')
      }
    }
    catch(error){
      console.log("Error:",error.message)
    }
  }

  return(
    <Card>
      <CardTitle>Login</CardTitle>
      <TextQuestion value={email} setValue={setEmail}>
        Username
      </TextQuestion>
      <TextQuestion value={password} setValue={setPassword}>
        Password
      </TextQuestion>
      <div className="flex justify-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <div className="flex justify-center gap-2">
        <div>
          Don't have an account?
        </div>
        <Link href='signup'>
          <button className="text-blue-500 font-semibold">
            Sign Up
          </button>
        </Link>
      </div>
    </Card>
  )
}