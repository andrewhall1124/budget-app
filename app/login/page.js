'use client'
import Link from "next/link";
import { useState } from "react";
import Card from "@/components/ui/Card";
import CardTitle from "@/components/ui/CardTitle";
import Button from "@/components/ui/Button";
import TextQuestion from "@/components/ui/TextQuestion";
import { login } from "@/lib/actions";

export default function Page(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
        <Button onClick={() => login(email,password)}>Submit</Button>
      </div>
      <div className="flex justify-center gap-2">
        <div>
          Don&apos;t have an account?
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