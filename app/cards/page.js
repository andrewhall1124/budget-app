'use client'
import React from "react";
import { useState } from "react";
import { Card, CardTitle, Button } from "../components";

export default function Cards(){

  const buttonGroup = [
    'Debit',
    'Credit',
  ]

  const [selectedGroup, setSelectedGroup] = useState("Debit");

  return(
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
      <div className="px-4 w-full flex justify-center">
        <Button variant="contained">Add New</Button>
      </div>
    </div>
  )
}