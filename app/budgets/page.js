'use client'
import React from "react"
import { useState, useEffect } from "react"
import { SelectQuestion, Card, CardTitle, Button, Header, TextAreaQuestion, AmountQuestion } from "../components"
import { supabase } from "../config/supabaseClient"

function BudgetCard({handleClose}){
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("")
  const budgetTypes = [
    'Income',
    'Expense',
  ]

  const handleSubmit = async () => {
    try {
      // Send data to the 'your_table_name' table in your Supabase database
      const { data, error } = await supabase
        .from('budgets')
        .insert({ name, type, amount});
      handleClose();
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setName("");
        setType("")
        setAmount(0.00);
        handleClose();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Category</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={budgetTypes}>Type</SelectQuestion>
      <AmountQuestion value={amount} setValue={setAmount}></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={handleSubmit}>Submit</Button>
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

  const buttonGroup = [
    'Planned',
    'Spent',
    'Remaining'
  ]

  const [selectedGroup, setSelectedGroup] = useState("Spent");

  const [budgets, setBudgets] = useState([])

  useEffect(() => {
    getBudgets();
  }, []);

  const getBudgets = async () => {
    try {
      const { data, error } = await supabase
        .from('budgets')
        .select();
  
      if (error) {
        console.log(error);
      } else{
        console.log('Successfuly fetched budgets', data)
        setBudgets(data);
      }
    } catch (error) {
      console.error('Error fetching budgets:', error.message);
    }
  };

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
          {budgets.map((budget, index) => (
            <Card key={index}>
              <div className="flex justify-between items-center">
                <div className="text-main-2 font-semibold text-xl">{budget.name}</div>
                <div className="flex gap-1 bg-main-2 p-2 rounded-xl text-white">
                  <div>{budget.amount}</div>
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