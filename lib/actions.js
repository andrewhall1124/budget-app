import { redirect } from "next/navigation"
import supabase from "./supabase"

export async function login(email, password){
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
      return redirect('/')
    }
  }
  catch(error){
    console.log("Error:",error.message)
  }
}