'use client'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/app/config/supabaseClient"
import { useRouter } from "next/navigation"
import { BudgetCard } from "../../page"

export default function Edit(){
  const router = useRouter()
  const url = usePathname()
  const id = url.split('/')[3]
  const [card, setCard] = useState(null)

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = async () => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .select()
        .eq('id', id)
  
      if (error) {
        console.log(error);
      } else{
        console.log('Successfuly fetched budget', data)
        setCard(data[0]);
      }
    } catch (error) {
      console.error('Error fetching budget:', error.message);
    }
  };

  const handleClose = () =>{
    router.push('/budgets')
  }

  return (
    <div>
      {card && (
        <BudgetCard
          nameInit={card.name}
          typeInit={card.type}
          amountInit={card.amountPlanned}
          id={id}
          handleClose={handleClose}
        />
      )}
    </div>
  )
}