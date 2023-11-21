'use client'
import { TransactionCard } from "./components";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";

function Transaction(){
  return(
    <div className="flex justify-between border-t py-2">
      <div>
        <div className="font-semibold text-main">Groceries</div>
        <div className="italic">Walmart Run</div>
      </div>
      <div>
        <div>$100.57</div>
        <div className="italic">11/08/23</div>
      </div>
      {/* <div>Master Card</div> */}
    </div>
  )
}

export default function Home(){
  const [cardClosed, setCardClosed ] = useState(true)

  const handleCardClose = () => {
    setCardClosed(true)
  }

  return(
    <div className="relative bg-background flex-1 ">
      <div className="flex">
        {cardClosed ?
          <div className="bg-contrast rounded-lg w-full m-4 p-4 flex-1">
            <div className="text-lg pb-2">Recent Transactions</div>
            <Transaction/>
            <Transaction/>
            <Transaction/>
          </div>
          :
          <TransactionCard handleClose={handleCardClose}/>
        }
      </div>
      {cardClosed &&
        <div className="absolute bottom-12 right-4">
          <Fab className="bg-main" onClick={() =>setCardClosed(false)}>
            <div className="text-contrast">
              <Add />
            </div>
          </Fab> 
        </div>
      }
    </div>
  )
}