'use client'
import supabase from "./supabase";

export async function getUser(){
  try {
    const {data, error} = await supabase.auth.getSession()
    if(data){
      return data.session.user.id
    }
    if(error){
      console.error(error)
    }
  } catch (error) {
    console.log('Error:', error);
  }
}