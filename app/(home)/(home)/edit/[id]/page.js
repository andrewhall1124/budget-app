'use client'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/app/config/supabaseClient"
import { TransactionCard } from "../../page"
import { useRouter } from "next/navigation"

export default function Edit(){
  const router = useRouter()
  const url = usePathname()
  const id = url.split('/')[2]
  const [transaction, setTransaction] = useState(null)

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select()
        .eq('id', id)
  
      if (error) {
        console.log(error);
      } else{
        console.log('Successfuly fetched transactions', data)
        setTransaction(data[0]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const handleClose = () =>{
    router.push('/')
  }

  return (
    <div>
      {transaction && (
        <TransactionCard
          cardInit={transaction.card}
          typeInit={transaction.type}
          categoryInit={transaction.category}
          dateInit={transaction.date}
          notesInit={transaction.notes}
          amountInit={transaction.amount}
          handleClose={handleClose}
          id={id}
        />
      )}
    </div>
  )
}