'use client'
import { Card, CardTitle, TransactionCard, SelectQuestion, Button } from "./components";
import { Add } from "@mui/icons-material";
import { useState } from "react";

function Transaction(){
  return(
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold text-main">Groceries</div>
        <div className="italic">Walmart Run</div>
      </div>
      <div className="bg-light-red font-semibold text-dark-red p-2 text-sm rounded-xl">
        -100.57
      </div>
    </div>
  )
}

function Date(){

  return(
    <div className="text-white bg-grey rounded-xl text-sm p-2 font-semibold text-center">
      November 24th 2000
    </div>
  )
}

export default function Home(){
  const [cardClosed, setCardClosed ] = useState(true)

  const [month, setMonth] = useState('November')
  const monthMenu = [
    'September',
    'October',
    'November'
  ]

  const buttonGroup = [
    'Income',
    'Expenses',
    'Transfers'
  ]

  const [selectedGroup, setSelectedGroup] = useState("Expenses");

  return(
    <div className="relative bg-background flex-1 ">
      <div className="flex">
        {cardClosed ?
          <div className="flex flex-col w-full">
          <Card>
            <CardTitle>Transactions</CardTitle>
            <SelectQuestion value={month} setValue={setMonth} menu={monthMenu}>Month</SelectQuestion>
            <div className="flex w-full border-main-2 border-y-4 border-x-2">
              {buttonGroup.map((button, index)=>(
                <button key={index} 
                  className={`border-main-2 border-x-2 font-semibold p-2 w-1/3 flex justify-center ${button == selectedGroup ? "bg-main-2 text-contrast" : "bg-contrast text-main-2"}`}
                  onClick={()=>setSelectedGroup(button)}>
                  {button}
                </button>
              ))}
            </div>
          </Card>
          <div className="px-4 w-full flex justify-center">
            <Button variant="contained" onClick={() =>setCardClosed(false)}>Add New</Button>
          </div>
          <Card>
            <Date/>
            <Transaction/>
            <Transaction/>
            <Date/>
            <Transaction/>
          </Card>
          </div>
          :
          <TransactionCard handleClose={() => setCardClosed(true)}/>
        }
      </div>
    </div>
  )
}