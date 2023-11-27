'use client'
import React from "react";
import { useState, useEffect } from "react";
import { Card, CardTitle, Button, TextAreaQuestion, AmountQuestion, SelectQuestion, NumberBox } from "@/app/components";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { MoreVert, Edit, Delete } from "@mui/icons-material";
import { supabase } from "@/app/config/supabaseClient";
import Link from "next/link";

export function CardCard({handleClose, nameInit, amountInit, typeInit, id}){
  const [name, setName] = useState(nameInit ? nameInit : "")
  const [amount, setAmount] = useState(amountInit ? amountInit : 0)
  const [type, setType] = useState(typeInit ? typeInit : "")
  const cardTypes = [
    'Debit',
    'Credit',
  ]

  const handleSubmit = async (update) => {
    if(update == true){ // Update card
      try {
        const { data, error } = await supabase
          .from('cards')
          .update({ name, amount, type })
          .eq('id', id)
        handleClose();
        if (error) {
          console.error('Error updating data:', error);
        } else {
          console.log('Data updated successfully:', data);
          // Optionally, reset the form after successful submission
          setName("");
          setAmount(0);
          setType("");
          handleClose();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    else { //Insert new card
      try {
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
    }
    
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Card</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={cardTypes}>Type</SelectQuestion>
      <AmountQuestion value={amount} setValue={setAmount}></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={() => handleSubmit(id ? true : false)}>Submit</Button>
      </div>
    </Card>
  )
}

function CardLine({amount, name, id}){
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () =>{
    setAnchorEl(null)
  }

  const [dialogOpen, setDialogOpen] = useState(false)

  const openDialog = () =>{
    handleClose()
    setDialogOpen(true)
  }

  const deleteCard = async () => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id)
      if (error) {
        console.error('Error deleting data:', error);
      } else {
        console.log('Data deleted successfully:', data);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return(
    <>
      <Card>
        <div className="flex justify-between items-center">
        <div className="flex items-center">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MoreVert/>
            </IconButton>
          <div className="font-semibold text-main-2 text-xl">{name}</div>
        </div>
          <NumberBox color={amount >= 0 ? 'green' : 'red'}>{amount}</NumberBox>
        </div>
      </Card>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href={`cards/edit/${id}`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon><Edit/></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={openDialog}>
          <ListItemIcon><Delete/></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete card?</DialogTitle>
        <DialogContent>Warning: this cannot be undone</DialogContent>
        <div className="flex justify-center gap-4 pb-4">
          <Button variant='outline' onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant='red' onClick={deleteCard}>Delete</Button>
        </div>
      </Dialog>
    </>
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
              <CardLine key={index} amount={card.amount} name={card.name} id={card.id}/>
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