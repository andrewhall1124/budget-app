'use client'
import React from "react"
import { useState, useEffect } from "react"
import { SelectQuestion, Card, CardTitle, Button, Header, TextAreaQuestion, AmountQuestion } from "../components"

function BudgetCard({handleClose}){
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("")
  const budgetTypes = [
    'Income',
    'Expense',
  ]
  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Budget</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={budgetTypes}>Type</SelectQuestion>
      <AmountQuestion></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={handleClose}>Submit</Button>
      </div>
    </Card>
  )
}

export default function Budgets(){
  const [modalClosed, setModalClosed] = useState(true)

  const [month, setMonth] = useState('November')
  const monthMenu = [
    'September',
    'October',
    'November'
  ]

  const budget = [
    {
      category: 'Groceries',
      planned: 400,
      spent: 100,
    },
    {
      category: 'Gas',
      planned: 100,
      spent: 50,
    },
    {
      category: 'Rent',
      planned: 1000,
      spent: 1000,
    },
  ]

  const buttonGroup = [
    'Planned',
    'Spent',
    'Remaining'
  ]

  const [selectedGroup, setSelectedGroup] = useState("Spent");




  return(
    <>
    <Header openAdd={() => setModalClosed(false)}/>
    <div className="mt-12">
      {modalClosed ? (
        <div>
          <Card>
            <CardTitle>Budget</CardTitle>
            <SelectQuestion value={month} setValue={setMonth} menu={monthMenu}>
              Month
            </SelectQuestion>
            <div className="flex w-full border-main-2 border-y-4 border-x-2">
              {buttonGroup.map((button, index) => (
                <button
                  key={index}
                  className={`border-main-2 border-x-2 font-semibold p-2 w-1/3 flex justify-center ${
                    button === selectedGroup ? 'bg-main-2 text-contrast' : 'bg-contrast text-main-2'
                  }`}
                  onClick={() => setSelectedGroup(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </Card>
          {budget.map((budget, index) => (
            <Card key={index}>
              <div className="flex justify-between items-center">
                <div className="text-main-2 font-semibold text-xl">{budget.category}</div>
                <div className="flex gap-1 bg-main-2 p-2 rounded-xl text-white">
                  {selectedGroup === 'Planned' && <div>{budget.planned}</div>}
                  {selectedGroup === 'Spent' && <div>{budget.spent}</div>}
                  {selectedGroup === 'Remaining' && <div>{budget.planned - budget.spent}</div>}
                </div>
              </div>
            </Card>
          ))}
      </div>
      ) : (
        <BudgetCard handleClose={() => setModalClosed(true)}/>
      )}

    </div>
  </>
  )
}