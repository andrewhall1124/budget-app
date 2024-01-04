'use client'
import React from "react"
import { useState, useEffect, useContext } from "react"
import { SelectQuestion, Card, CardTitle, Button, TextAreaQuestion, AmountQuestion, NumberBox } from "@/app/components"
import { supabase } from "@/app/config/supabaseClient"
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { Edit, Delete, MoreVert } from "@mui/icons-material"
import Link from "next/link"
import { AuthContext } from "../layout"
import dayjs from "dayjs"

export function BudgetCard({handleClose, nameInit, amountInit, typeInit, id}){
  const [name, setName] = useState(nameInit ? nameInit : "")
  const [amountPlanned, setAmountPlanned] = useState(amountInit ? amountInit :"")
  const [type, setType] = useState(typeInit ? typeInit :"")
  const user_id = useContext(AuthContext).user.id
  const date = dayjs()

  const budgetTypes = [
    'Income',
    'Expense',
  ]

  const handleSubmit = async (update) => {
    if(update == true) { // Update Budget
      try {
        const { data, error } = await supabase
          .from('budgets')
          .update({ name, type, amountPlanned})
          .eq('id', id)
        handleClose();
        if (error) {
          console.error('Error updating data:', error);
        } else {
          console.log('Data updated successfully:', data);
          setName("");
          setType("")
          setAmountPlanned(0.00);
          handleClose();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
    else{ // Insert new budget
      try {
        const { data, error } = await supabase
          .from('budgets')
          .insert({ name, type, amountPlanned, user_id, date});
        handleClose();
        if (error) {
          console.error('Error inserting data:', error);
        } else {
          console.log('Data inserted successfully:', data);
          setName("");
          setType("")
          setAmountPlanned(0.00);
          handleClose();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Category</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={budgetTypes}>Type</SelectQuestion>
      <AmountQuestion value={amountPlanned} setValue={setAmountPlanned}></AmountQuestion>
      <div className='flex justify-center'>
        <Button onClick={() => handleSubmit(id ? true : false)}>Submit</Button>
      </div>
    </Card>
  )
}

function Budget({name, amount, spent, id}){
  const percentageSpent = (spent / amount) * 100;
  const amountLeft = Math.round((amount - spent)*100)/100
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

  const deleteBudget = async () => {
    try {
      const { data, error } = await supabase
        .from('budgets')
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
      <div className="pr-2 flex items-center">
        <div>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVert/>
          </IconButton>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="text-sm font-semibold">{name}</div>
            {amountLeft < 0 ?
            <div className="text-sm font-semibold">${-amountLeft} over</div>
            :
            <div className="text-sm font-semibold">${amountLeft} left</div>
            }
          </div>

          <div className="bg-light-grey">
            {percentageSpent > 100 ?
            <div className={`bg-red-300 h-2 my-1`} style={{ width: `100%` }}></div>
            :
            <div className={`bg-green-300 h-2 my-1`} style={{ width: `${percentageSpent}%` }}></div>
            }
          </div>

          <div className="flex text-sm font-semibold pb-1 gap-1">
            <div>${Math.round(spent*100)/100}</div>
            <div className="text-dark-grey">of ${amount}</div>
          </div>
        </div>
      </div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Link href={`budgets/edit/${id}`}>
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
        <DialogTitle>Delete budget?</DialogTitle>
        <DialogContent>Warning: this cannot be undone</DialogContent>
        <div className="flex justify-center gap-4 pb-4">
          <Button variant='outline' onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant='red' onClick={deleteBudget}>Delete</Button>
        </div>
      </Dialog>
    </>
  )
}

export default function Budgets(){
  const user_id = useContext(AuthContext).user.id
  const [month, setMonth] = useState("")
  const [monthMenu, setMonthMenu] = useState([])
  const [categories, setCategories] = useState([])

  const monthMapping = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  useEffect(()=>{
    fetchMonths()
  },[])

  useEffect(() => {
    if(user_id && month){
      getData()
    }
  }, [user_id, month]);

  const fetchMonths = async () =>{
    try{
      const {data, error} = await supabase.from('budgets').select('date')
      if(data){
        const uniqueMonths = new Set();
        data.forEach(obj => {
          const date = new dayjs(obj.date);
          const month = date.format("MMMM-YY")
          uniqueMonths.add(month)
        });
        uniqueMonths.add(dayjs().format("MMMM-YY"))
        const uniqueMonthsArray = Array.from(uniqueMonths);
        setMonthMenu(uniqueMonthsArray)
        setMonth(dayjs().format("MMMM-YY"))
      }
      if(error){
        console.error(error)
      }
    }
    catch(error){
      console.error(error)
    }
  }

  const getData = async () => {
    const selectedMonth = monthMapping[month.split("-")[0]]
    const selectedYear = parseInt('20' + month.split("-")[1])
    const selectedDate = new Date(selectedYear, selectedMonth, 15)
    const formattedDate = dayjs(selectedDate.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }));
    const startDate = formattedDate.startOf('month').format("YYYY-MM-DD")
    const endDate = formattedDate.endOf('month').format("YYYY-MM-DD")

    const { data: budgets, budgetError } = await supabase
      .from('budgets')
      .select()
      .eq("user_id", user_id)
      .gte("date", startDate)
      .lte("date", endDate)

    if(budgetError){
      console.error(budgetError)
    }

    const {data: transactions, transactionError} = await supabase
      .from('transactions')
      .select()
      .eq("user_id", user_id)
      .gte("date", startDate)
      .lte("date", endDate)

      if(transactionError){
        console.error(transactionError)
      }
      else{

      console.log(transactions)
      
      if(transactions){
        const categoriesWithTotal = budgets.map(budget => {
          const amountSpent = transactions
            .filter(transaction => transaction.category === budget.name)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
    
            return {
              ...budget,
              amountSpent,
            };
          });
        console.log(categoriesWithTotal)
        setCategories(categoriesWithTotal);
      }
    }
  };

  return(
    <>
    <div>
        <div>
          <Card>
            <CardTitle>Budget</CardTitle>
            <SelectQuestion value={month} setValue={setMonth} menu={monthMenu}>
              Month
            </SelectQuestion>
          </Card>
          <div className="bg-white rounded-xl m-4 py-4 pr-4 pl-2 flex flex-col gap-4">
            <div className="flex justify-center font-semibold text-main-2 text-lg">Income</div>
            {categories.map((category, index) => (
                category.type == "Income" &&
                  <Budget key={index} name={category.name} amount={category.amountPlanned} spent={category.amountSpent} id={category.id}/>
            ))}
          </div>
          <div className="bg-white rounded-xl m-4 py-4 pr-4 pl-2 flex flex-col gap-4">
            <div className="flex justify-center font-semibold text-main-2 text-lg">Expense</div>
            {categories.map((category, index) => (
                category.type == "Expense" &&
                  <Budget key={index} name={category.name} amount={category.amountPlanned} spent={category.amountSpent} id={category.id}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}