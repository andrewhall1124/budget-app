'use client'
import React from 'react'
import { AccountBalanceWallet, AttachMoney, Close, CreditCard, Add, AccountCircle, Edit, Delete, MoreVert } from '@mui/icons-material'
import { IconButton, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput, Menu, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { usePathname } from 'next/navigation'

export function Header(){
  const url = usePathname().split('/')
  const currentPage = url[url.length-1]
  let addLink = "/add"
  if(currentPage == "add"){
    addLink = ""
  }

  return(
    <div className='fixed bg-background w-full top-0 h-12 z-40'>
      <div className='flex justify-end items-center gap-2 h-full px-4'>
          {
            currentPage == "account" ?
            <div></div>:
            <Link href={currentPage + `${addLink}`}>
              <IconButton>
                <Add sx={{color: 'white'}} fontSize='large'/>
              </IconButton>
            </Link>
          }

        <Link href={`/account`}>
          <IconButton>
            <AccountCircle sx={{color: 'white'}} fontSize='large'/>
          </IconButton>
        </Link>
      </div>
    </div>
  )
}

export function Footer(){
  return(
    <footer className='bg-main fixed w-full bottom-0 h-28 shadow-lg z-40 pb-8 px-8'>
      <div className='flex justify-between items-center h-full'>
        <Link href='/'>
          <div className='flex flex-col items-center w-24'>
            <AttachMoney fontSize='large' sx={{color:"white"}}/>
            <div className='text-contrast text-sm'>Transactions</div>
          </div>
        </Link>
        <Link href='/budgets'>
          <div className='flex flex-col items-center w-24'>
            <AccountBalanceWallet fontSize='large' sx={{color:"white"}}/>
            <div className='text-contrast text-sm'>Budgets</div>
          </div>
        </Link>
        <Link href='/cards'>
          <div className='flex flex-col items-center w-24'>
          <CreditCard fontSize='large' sx={{color:"white"}}/>
              <div className='text-contrast text-sm'>Cards</div>
          </div>
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

export function Card({children, header, handleClose}){
  return(
    <div className="bg-contrast m-4 rounded-xl flex-1 flex flex-col shadow-lg">
      {header &&
        <div className='h-10 rounded-t-xl bg-main relative'>
          <div className='absolute right-1'>
            <IconButton onClick={handleClose} className='text-contrast'>
              <Close/>
            </IconButton>
          </div>
        </div>
      }
      <div className='flex flex-col gap-4 px-4 py-4'>
        {children}
      </div>
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
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
  </FormControl>
  )
}

export function Button({children, onClick, variant }){

  const buttonVariant = () =>{
    if (variant == 'red'){
      return `bg-light-red text-dark-red`
    } 
    else if(variant = 'outline'){
      return 'bg-contrast text-main border-2 border-main'
    }
  }

  return(
    <button 
      onClick={() => onClick()} 
      className={`py-2 px-4 rounded-xl w-fit font-semibold ${buttonVariant()}`}>
      {children}
    </button>
  )
}

export function CardTitle({children}){

  return(
    <div className='text-main-2 text-xl font-semibold p-2 flex justify-center items-center'>
      {children}
    </div>
  )
}

export function NumberBox({children, color}){
  const style = () =>{
    if(color == 'red'){
      return 'bg-light-red text-dark-red'
    }
    else if(color == 'green'){
      return 'bg-light-green text-dark-green'
    }
    else if(color == 'grey'){
      return 'bg-light-grey text-dark-grey'
    }
    else{
      return 'bg-main-2 text-contrast'
    }
  }

  return(
    <div className={`font-semibold p-2 text-sm rounded-xl min-w-[50px] flex justify-center ${style()}`}>
      {Math.round(children*100)/100}
    </div>
  )
}


