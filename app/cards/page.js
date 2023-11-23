'use client'
import React, { use } from "react";
import { useState } from "react";
import { Card, CardTitle, Button, Header, TextAreaQuestion, AmountQuestion, SelectQuestion } from "../components";

function CardCard({handleClose}){
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("")
  const cardTypes = [
    'Income',
    'Expense',
  ]
  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Card</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={cardTypes}>Type</SelectQuestion>
      <AmountQuestion></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={handleClose}>Submit</Button>
      </div>
    </Card>
  )
}

export default function Cards(){
  const [modalClosed, setModalClosed] = useState(true)

  const buttonGroup = [
    'Debit',
    'Credit',
  ]

  const [selectedGroup, setSelectedGroup] = useState("Debit");

  return(
    <>
      <Header openAdd={() => setModalClosed(false)}/>
      <div className="mt-12">
        {modalClosed ? (
        <div>
          <Card>
            <CardTitle>Cards</CardTitle>
            <div className="flex w-full border-main-2 border-y-4 border-x-2">
              {buttonGroup.map((button, index)=>(
                <button key={index} 
                  className={`border-main-2 border-x-2 font-semibold p-2 w-1/2 flex justify-center ${button == selectedGroup ? "bg-main-2 text-contrast" : "bg-contrast text-main-2"}`}
                  onClick={()=>setSelectedGroup(button)}>
                  {button}
                </button>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-main-2 text-xl">WF Checking</div>
              <div className="bg-main-2 text-white font-semibol rounded-xl  p-2">2000</div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-main-2 text-xl">WF Checking</div>
              <div className="bg-main-2 text-white font-semibol rounded-xl  p-2">2000</div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-main-2 text-xl">WF Checking</div>
              <div className="bg-main-2 text-white font-semibol rounded-xl  p-2">2000</div>
            </div>
          </Card>
        </div>
        ):(
          <CardCard handleClose={() => setModalClosed(true)}/>
        )}
        
      </div>
    </>
  )
}