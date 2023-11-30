'use client'
import { useRouter } from "next/navigation"
import { CardCard } from "../page"

export default function Page(){
  const router = useRouter();
  const handleClose = () =>{
    router.push('/cards')
  }

  return(
    <div>
      <CardCard
        handleClose={handleClose}
      />
    </div>
  )
}