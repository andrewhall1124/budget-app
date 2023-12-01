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
  const [amount, setAmount] = useState(amountInit ? amountInit :"")
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
          .update({ name, type, amount})
          .eq('id', id)
        handleClose();
        if (error) {
          console.error('Error updating data:', error);
        } else {
          console.log('Data updated successfully:', data);
          setName("");
          setType("")
          setAmount(0.00);
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
          .insert({ name, type, amount, user_id, date});
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
    }
  };

  return(
    <Card header={true} handleClose={handleClose}>
      <CardTitle>New Category</CardTitle>
      <TextAreaQuestion value={name} setValue={setName}>Name</TextAreaQuestion>
      <SelectQuestion value={type} setValue={setType} menu={budgetTypes}>Type</SelectQuestion>
      <AmountQuestion value={amount} setValue={setAmount}></AmountQuestion>
      <div className='flex justify-center'>
        <Button onClick={() => handleSubmit(id ? true : false)}>Submit</Button>
      </div>
    </Card>
  )
}

function Budget({name, amount, id}){
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
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
              <MoreVert/>
            </IconButton>
            <div className="text-main-2 font-semibold text-xl">{name}</div>
          </div>
          <NumberBox color='grey'>{amount}</NumberBox>
        </div>
      </Card>
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
  const [modalClosed, setModalClosed] = useState(true)
  const currentDate = dayjs()
  const [month, setMonth] = useState(currentDate.format('MMMM'))
  const monthMenu = [
    'November',
    'December'
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
        .select()
        .eq("user_id", user_id)
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
    <div>
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
            budget.date && dayjs(budget.date).format("MMMM") == month &&
              <Budget key={index} name={budget.name} amount={budget.amount} id={budget.id}/>
          ))}
      </div>
      ) : (
        <BudgetCard handleClose={() => setModalClosed(true)}/>
      )}
    </div>
  </>
  )
}