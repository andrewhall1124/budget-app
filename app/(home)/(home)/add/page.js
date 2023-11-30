'use client'
import { useRouter } from "next/navigation"
import { TransactionCard } from "../page"

export default function Page(){
  const router = useRouter();
  const handleClose = () =>{
    router.push('/')
  }

  return(
    <div>
      <TransactionCard
        handleClose={handleClose}
      />
    </div>
  )
}