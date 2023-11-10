'use client'
import React from 'react'
import { useState } from 'react'
import { AccountBalanceWallet, AttachMoney, Close, CreditCard } from '@mui/icons-material'
import { IconButton, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput, Button } from '@mui/material'
import Link from 'next/link'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function Header(){
  return(
    <header className='fixed bg-main w-full top-0 h-20 shadow-lg z-40'>
      <div className='flex justify-center items-center h-full'>
        <Link href="/">
          <div className='font-semibold text-2xl text-contrast'>Budget App</div>
        </Link>
      </div>

    </header>
  )
}

export function Footer(){
  return(
    <footer className='bg-main fixed w-full bottom-0 h-20 px-16 shadow-lg z-40'>
      <div className='flex justify-between items-center h-full'>
        <Link href='transactions'>
          <IconButton className='text-contrast' color='inherit'>
            <AttachMoney fontSize='large'/>
          </IconButton>
        </Link>
        <Link href='budgets'>
          <IconButton className='text-contrast'>
            <AccountBalanceWallet fontSize='large' color='inherit'/>
          </IconButton>
        </Link>
        <Link href='cards'>
          <IconButton className='text-contrast'>
            <CreditCard fontSize='large'/>
          </IconButton>
        </Link>
      </div>
    </footer> 
  )
}

export function H2({children}){

  return(
    <div className='text-xl text-main'>
      {children}
    </div>
  )
}

export function H3({children}){

  return(
    <div className='text-lg text-contrast'>
      {children}
    </div>
  )
}

export function SelectQuestion({value, setValue, children, menu}){

  return(
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{children}</InputLabel>
      <Select
        value={value}
        label={children}
        onChange={(event) =>(setValue(event.target.value))}
      >
        {menu.map((row, index) =>(
          <MenuItem key={index} value={row}>{row}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export function DateQuestion({value, setValue}){

  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={(newValue)=>(setValue(newValue))} sx={{width: "100%"}}/>
    </LocalizationProvider>
  )
}

export function TextQuestion({value, setValue, children}){
  return(
    <div>
      <TextField label={children} value={value} onChange={(event)=>(setValue(event.target.value))} sx={{width: '100%'}}>{children}</TextField>
    </div>
  )
}

export function TextAreaQuestion({value, setValue, children}){
  return(
    <div>
      <TextField multiline label={children} value={value} onChange={(event)=>(setValue(event.target.value))} sx={{width: '100%'}}>{children}</TextField>
    </div>
  )
}

export function AmountQuestion({value, setValue, children}){
  return(
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Amount</InputLabel>
      <OutlinedInput
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
      />
  </FormControl>
  )
}


export function TransactionCard({handleClose}){
  const [card, setCard] = useState("")
  const cardMenu = ['Discover', 'Master Card', 'Visa']
  const [category, setCategory] = useState("")
  const categoryMenu = ['Gas', 'Groceries', 'Restaurants']
  const [date, setDate] = useState();
  const [notes, setNotes] = useState("")
  const [amount, setAmount] = useState("")
  return(
    <div className="bg-contrast m-6 rounded-xl flex-1 flex flex-col shadow-lg">
      <div className='h-10 rounded-t-xl bg-main relative'>
        <div className='absolute right-1'>
          <IconButton onClick={handleClose} className='text-contrast'>
            <Close/>
          </IconButton>
        </div>
      </div>
      <div className='bg-main-2 mx-2 mt-2 rounded-xl p-2 flex justify-center items-center'>
        <H3>Details</H3>
      </div>
      <div className='p-2'>
        <SelectQuestion value={card} setValue={setCard} menu={cardMenu}>Card</SelectQuestion>
      </div>
      <div className='p-2'>
        <SelectQuestion value={category} setValue={setCategory} menu={categoryMenu}>Category</SelectQuestion>
      </div>
      <div className='p-2'>
        <DateQuestion value={date} setValue={setDate}/>
      </div>
      <div className='p-2'>
        <TextAreaQuestion value={notes} setValue={setNotes}>Notes</TextAreaQuestion>
      </div>
      <div className='p-2'>
        <AmountQuestion></AmountQuestion>
      </div>
      <div className='p-2 flex justify-center'>
        <Button variant='contained' className='bg-main text-contrast' onClick={handleClose}>Submit</Button>
      </div>
    </div>
  )
}