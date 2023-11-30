'use client'
import { useRouter } from "next/navigation"
import { BudgetCard } from "../page"

export default function Page(){
  const router = useRouter();
  const handleClose = () =>{
    router.push('/budgets')
  }

  return(
    <div>
      <BudgetCard
        handleClose={handleClose}
      />
    </div>
  )
}