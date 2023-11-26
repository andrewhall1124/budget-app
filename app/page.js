'use client'
import { Card, CardTitle, SelectQuestion, Header, DateQuestion, TextAreaQuestion, AmountQuestion, Button, NumberBox } from "./components";
import { useState, useEffect } from "react";
import { supabase } from "./config/supabaseClient";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import Link from "next/link";
import dayjs from "dayjs";

export function TransactionCard({cardInit, typeInit, categoryInit, dateInit, notesInit, amountInit, handleClose, id}){
  const [card, setCard] = useState(cardInit ? cardInit : "")
  const cardMenu = ['Discover', 'Master Card', 'Visa']
  const [type, setType] = useState(typeInit ? typeInit : "")
  const typeMenu = ['Income', 'Expense', 'Transfer']
  const [category, setCategory] = useState(categoryInit ? categoryInit : "")
  const categoryMenu = ['Gas', 'Groceries', 'Restaurants']
  const [date, setDate] = useState(dateInit && dateInit );
  const [notes, setNotes] = useState(notesInit ? notesInit : "")
  const [amount, setAmount] = useState(amountInit ? amountInit : 0.00)

  const handleSubmit = async (update) => {
    if(update == true){ //Update transaction
      try {
        const { data, error } = await supabase
          .from('transactions')
          .update({ card, type, category, date, notes, amount })
          .eq('id', id)
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
    } else{ // Insert new transaction
      try {
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
    }
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Transaction</CardTitle>
      <SelectQuestion value={card} setValue={setCard} menu={cardMenu}>Card</SelectQuestion>
      <SelectQuestion value={type} setValue={setType} menu={typeMenu}>Type</SelectQuestion>
      <SelectQuestion value={category} setValue={setCategory} menu={categoryMenu}>Category</SelectQuestion>
      <DateQuestion value={dayjs(date)} setValue={setDate}/>
      <TextAreaQuestion value={notes} setValue={setNotes}>Notes</TextAreaQuestion>
      <AmountQuestion value={amount} setValue={setAmount}></AmountQuestion>
      <div className='flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={() => handleSubmit(id ? true : false)}>Submit</Button>
      </div>
    </Card>
  )
}

function Transaction({category, notes, amount, type, index, id}){
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

  const deleteTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
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
      <div className={`flex justify-between items-center ${index != 0 && 'border-t-2 border-background pt-2'} `}>
        <div className="flex">
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVert/>
          </IconButton>
          <div>
            <div className="font-semibold text-main-2">{category}</div>
            <div>{notes}</div>
          </div>
        </div>
        <NumberBox color={type == 'Income' ? 'green' : type == 'Expense' ? 'red': 'grey'}>{amount}</NumberBox>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href={`/edit/${id}`}>
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
        <DialogTitle>Delete transaction?</DialogTitle>
        <DialogContent>Warning: this cannot be undone</DialogContent>
        <div className="flex justify-center gap-4 pb-4">
          <Button variant='outline' onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant='red' onClick={deleteTransaction}>Delete</Button>
        </div>
      </Dialog>
   </>
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

  const [month, setMonth] = useState('All')
  const monthMenu = [
    'All',
    'September',
    'October',
    'November'
  ]

  const buttonGroup = [
    'Income',
    'Expense',
    'Transfer'
  ]

  const [selectedGroup, setSelectedGroup] = useState("Expense");

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select();
  
      if (error) {
        console.log(error);
      } else{
        console.log('Successfuly fetched transactions', data)
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const filteredTransactions = () => {
    return transactions.filter(transaction => transaction.type === selectedGroup);
  };

  return(
    <>
      <Header openAdd={() => setCardClosed(false)}/>
      <div className="relative bg-background flex-1 mt-12">
        {cardClosed ?
          <div className="w-full">
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
            {filteredTransactions().map((transaction, index) =>(
              <Transaction key={index} index={index} category={transaction.category} notes={transaction.notes} amount={transaction.amount} type={transaction.type} id={transaction.id}/>
            ))}
          </Card>
          </div>
          :
          <TransactionCard handleClose={() => setCardClosed(true)}/>
        }
      </div>
    </>
  )
}