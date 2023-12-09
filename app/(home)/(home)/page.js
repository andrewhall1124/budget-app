'use client'
import { Card, CardTitle, SelectQuestion, DateQuestion, TextAreaQuestion, AmountQuestion, Button, NumberBox } from "@/app/components";
import { useState, useEffect, useContext } from "react";
import { supabase } from "@/app/config/supabaseClient";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import Link from "next/link";
import dayjs from "dayjs";
import { AuthContext } from "./layout";

export function TransactionCard({cardInit, typeInit, categoryInit, dateInit, notesInit, amountInit, handleClose, id}){
  const [card, setCard] = useState(cardInit ? cardInit : "")
  const [type, setType] = useState(typeInit ? typeInit : "")
  const typeMenu = ['Income', 'Expense']
  const [category, setCategory] = useState(categoryInit ? categoryInit : "")
  const currentDate = dayjs()
  const [date, setDate] = useState(dateInit ? dayjs(dateInit) : currentDate );
  const [notes, setNotes] = useState(notesInit ? notesInit : "")
  const [amount, setAmount] = useState(amountInit ? amountInit : 0.00)
  const user_id = useContext(AuthContext).user.id

  const [cardOptions, setCardOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])

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
          .insert({ card, type, category, date, notes, amount, user_id });
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

  const getCategories = async () =>{
    try{
      const { data, error } = await supabase
        .from('budgets')
        .select('name')
      if(error){
        console.log(error)
      }
      else{
        console.log(data)
        setCategoryOptions(convertData(data))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const getCards = async () => {
    try{
      const { data, error } = await supabase
        .from('cards')
        .select('name')
      if(error){
        console.log(error)
      }
      else{
        console.log(data)
        setCardOptions(convertData(data))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  function convertData(objectArray){
    let outputArray = []
    for(const object of objectArray){
      outputArray.push(object.name)
    }
    return outputArray
  }

  useEffect(()=>{
    getCards()
    getCategories()
  },[])

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Transaction</CardTitle>
      <SelectQuestion value={card} setValue={setCard} menu={cardOptions}>Card</SelectQuestion>
      <SelectQuestion value={type} setValue={setType} menu={typeMenu}>Type</SelectQuestion>
      <SelectQuestion value={category} setValue={setCategory} menu={categoryOptions}>Category</SelectQuestion>
      <DateQuestion value={date} setValue={setDate}/>
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
      <div className={`flex justify-between items-center 'border-b-2 border-background`}>
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

function Date({date}){

  return(
    <div className="text-white bg-grey rounded-xl text-sm p-2 font-semibold text-center">
      {date}
    </div>
  )
}

export default function Transactions(){
  const currentDate = dayjs()
  const user_id = useContext(AuthContext).user.id
  const [month, setMonth] = useState(currentDate.format("MMMM"))
  const monthMenu = [
    'All',
    'November',
    'December'
  ]

  const buttonGroup = [
    'Income',
    'Expense'
  ]

  const [selectedGroup, setSelectedGroup] = useState("Expense");

  const [incomeArray, setIncomeArray] = useState([])
  const [expensesArray, setExpensesArray] = useState([])


  useEffect(() => {
    if(user_id){
      getTransactions();
    }
  }, [user_id]);

  const getTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select()
        .eq('user_id', user_id)
      if (error) {
        console.log(error);
      } else{
        console.log('Successfuly fetched transactions', data)

        const sortedTransactions = data.sort((a, b) => {
          const dateA = dayjs(a.date)
          const dateB = dayjs(b.date)
          return dateB - dateA;
        });

        const expenseTransactions = sortedTransactions.filter(transaction => transaction.type === 'Expense');
        const incomeTransactions = sortedTransactions.filter(transaction => transaction.type === 'Income');

        const groupedExpenses = expenseTransactions.reduce((result, transaction) => {
          const dateKey = dayjs(transaction.date)
          result[dateKey] = result[dateKey] || [];
          result[dateKey].push(transaction);
          return result;
        }, {});

        const groupedIncome = incomeTransactions.reduce((result, transaction) => {
          const dateKey = dayjs(transaction.date)
          result[dateKey] = result[dateKey] || [];
          result[dateKey].push(transaction);
          return result;
        }, {});

        const expensesArray = Object.values(groupedExpenses);
        const incomeArray = Object.values(groupedIncome);

        setExpensesArray(expensesArray)
        setIncomeArray(incomeArray)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  return(
    <>
      <div className="relative bg-background flex-1">
        <div className="w-full">
        <Card>
          <CardTitle>Transactions</CardTitle>
          <SelectQuestion value={month} setValue={setMonth} menu={monthMenu}>Month</SelectQuestion>
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
        {selectedGroup == "Income" &&
          incomeArray.map((transactions, index) =>(
            (month === "All"  || dayjs(transactions[0].date).format("MMMM") == month) &&
            <Card key={index}>
              <CardTitle>{dayjs(transactions[0].date).format("MMMM D YYYY")}</CardTitle>
              {transactions.map((transaction, index) =>(
                <Transaction key={index} index={index} category={transaction.category} notes={transaction.notes} amount={transaction.amount} type={transaction.type} id={transaction.id}/>
              ))}
            </Card>
          ))
        }
        {selectedGroup == "Expense" &&
          expensesArray.map((transactions, index) =>(
            (month === "All"  || dayjs(transactions[0].date).format("MMMM") == month) &&
            <Card key={index}>
              <CardTitle>{dayjs(transactions[0].date).format("MMMM D YYYY")}</CardTitle>
              {transactions.map((transaction, index) =>(
                <Transaction key={index} index={index} category={transaction.category} notes={transaction.notes} amount={transaction.amount} type={transaction.type} id={transaction.id}/>
              ))}
            </Card>
          ))
        }
        </div>
      </div>
    </>
  )
}