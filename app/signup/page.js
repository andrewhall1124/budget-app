'use client'
import { Card, CardTitle, TextQuestion, Button } from "../components";
import { useState } from "react";
import { supabase } from "../config/supabaseClient";

export default function Page(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async () =>{
    try{
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if(error){
        console.log("Error creating user:",error)
      }
      else{
        console.log("User created successfully:", data)
      }
    }
    catch(error){
      console.log("Error:",error.message)
    }
  }

  return(
    <Card>
      <CardTitle>Sign Up</CardTitle>
      <TextQuestion value={email} setValue={setEmail}>
        Username
      </TextQuestion>
      <TextQuestion value={password} setValue={setPassword}>
        Password
      </TextQuestion>
      <div className="flex justify-center">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Card>
  )
}