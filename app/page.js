'use client'
import { Card, CardTitle, SelectQuestion, Header, DateQuestion, TextAreaQuestion, AmountQuestion, Button } from "./components";
import { useState, useEffect } from "react";
import { supabase } from "./config/supabaseClient";

function TransactionCard({handleClose}){
  const [card, setCard] = useState("")
  const cardMenu = ['Discover', 'Master Card', 'Visa']
  const [type, setType] = useState("")
  const typeMenu = ['Income', 'Expense', 'Transfer']
  const [category, setCategory] = useState("")
  const categoryMenu = ['Gas', 'Groceries', 'Restaurants']
  const [date, setDate] = useState();
  const [notes, setNotes] = useState("")
  const [amount, setAmount] = useState(0.00)

  const handleSubmit = async () => {
    try {
      // Send data to the 'your_table_name' table in your Supabase database
      const { data, error } = await supabase
        .from('transactions')
        .insert({ card, type, category, date, notes, amount });
      handleClose();
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setCard("");
        setCategory("");
        setType("")
        setDate("");
        setNotes("");
        setAmount(0.00);
        handleClose();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Transaction</CardTitle>
      <SelectQuestion value={card} setValue={setCard} menu={cardMenu}>Card</SelectQuestion>
      <SelectQuestion value={type} setValue={setType} menu={typeMenu}>Type</SelectQuestion>
      <SelectQuestion value={category} setValue={setCategory} menu={categoryMenu}>Category</SelectQuestion>
      <DateQuestion value={date} setValue={setDate}/>
      <TextAreaQuestion value={notes} setValue={setNotes}>Notes</TextAreaQuestion>
      <AmountQuestion value={amount} setValue={setAmount}></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={handleSubmit}>Submit</Button>
      </div>
    </Card>
  )
}

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

  const [transactions, setTransactions] = useState()

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    const { data } = await supabase.from("transactions").select();
    setTransactions(data);
    console.log(data)
  }

  return(
    <>
      <Header openAdd={() => setCardClosed(false)}/>
      <div className="relative bg-background flex-1 mt-12">
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
    </>
  )
}