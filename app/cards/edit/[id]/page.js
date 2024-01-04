'use client'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/app/config/supabaseClient"
import { useRouter } from "next/navigation"
import { CardCard } from "../../page"

export default function Edit(){
  const router = useRouter()
  const url = usePathname()
  const id = url.split('/')[3]
  const [card, setCard] = useState(null)

  useEffect(() => {
    getCard();
  }, []);

  const getCard = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select()
        .eq('id', id)
  
      if (error) {
        console.log(error);
      } else{
        console.log('Successfuly fetched card', data)
        setCard(data[0]);
      }
    } catch (error) {
      console.error('Error fetching card:', error.message);
    }
  };

  const handleClose = () =>{
    router.push('/cards')
  }

  return (
    <div>
      {card && (
        <CardCard
          nameInit={card.name}
          typeInit={card.type}
          amountInit={card.amount}
          id={id}
          handleClose={handleClose}
        />
      )}
    </div>
  )
}