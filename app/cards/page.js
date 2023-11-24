'use client'
import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, Button, Header, TextAreaQuestion, AmountQuestion, SelectQuestion } from "../components";
import { supabase } from "../config/supabaseClient";

function CardCard({handleClose}){
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("")
  const cardTypes = [
    'Debit',
    'Credit',
  ]

  const handleSubmit = async () => {
    try {
      // Send data to the 'your_table_name' table in your Supabase database
      const { data, error } = await supabase
        .from('cards')
        .insert({ name, amount, type });
      handleClose();
      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        // Optionally, reset the form after successful submission
        setName("");
        setAmount(0);
        setType("");
        handleClose();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Card</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={cardTypes}>Type</SelectQuestion>
      <AmountQuestion></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={handleSubmit}>Submit</Button>
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

  useEffect(() => {
    getCards();
  }, []);

  const [cards, setCards] = useState([])

  const getCards = async () => {
    try {
      // Send data to the 'your_table_name' table in your Supabase database
      const { data, error } = await supabase
        .from('cards')
        .select();

      if (error) {
        console.error('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully:', data);
        setCards(data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

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
          {cards.map((card, index) => (
            (card.type == selectedGroup && 
              <Card key={index}>
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-main-2 text-xl">{card.name}</div>
                  <div className="bg-main-2 text-white font-semibol rounded-xl  p-2">{card.amount}</div>
                </div>
              </Card>
            )
          ))}
        </div>
        ):(
          <CardCard handleClose={() => setModalClosed(true)}/>
        )}
        
      </div>
    </>
  )
}