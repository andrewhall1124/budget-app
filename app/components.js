'use client'
import React from 'react'
import { useState } from 'react'
import { AccountBalanceWallet, AttachMoney, Close, CreditCard, Add, AccountCircle } from '@mui/icons-material'
import { IconButton, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, OutlinedInput } from '@mui/material'
import Link from 'next/link'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function Header({openAdd, openAccount}){
  return(
    <div className='fixed bg-background w-full top-0 h-12 z-40'>
      <div className='flex justify-end items-center gap-2 h-full px-4'>
        <IconButton onClick={openAdd}>
          <Add sx={{color: 'white'}} fontSize='large'/>
        </IconButton>
        <IconButton onClick={openAccount}>
          <AccountCircle sx={{color: 'white'}} fontSize='large'/>
        </IconButton>
      </div>
    </div>
  )
}

export function Footer(){
  return(
    <footer className='bg-main fixed w-full bottom-0 h-28 px-16 shadow-lg z-40 pb-8'>
      <div className='flex justify-between items-center h-full'>
        <Link href='/'>
          <IconButton>
            <AttachMoney fontSize='large' sx={{color:"white"}}/>
          </IconButton>
        </Link>
        <Link href='budgets'>
          <IconButton>
            <AccountBalanceWallet fontSize='large' sx={{color:"white"}}/>
          </IconButton>
        </Link>
        <Link href='cards'>
          <IconButton>
            <CreditCard fontSize='large' sx={{color:"white"}}/>
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

export function Button({children, onClick}){

  return(
    <button onClick={() => onClick()} className='bg-main text-contrast py-2 px-4 rounded-xl w-fit font-semibold '>
      {children}
    </button>
  )
}

export function CardTitle({children}){

  return(
    <div className='bg-main-2 mt-2 rounded-xl p-2 flex justify-center items-center'>
      <H3>{children}</H3>
    </div>
  )
}

export function NumberBox({children, color}){

  return(
    <div className={`bg-light-${color} font-semibold text-dark-${color} p-2 text-sm rounded-xl min-w-[50px] flex justify-center`}>
      {children}
    </div>
  )
}


