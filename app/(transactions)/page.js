'use client'
import { fetchTransactions } from "@/lib/data";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export default function Transactions(){
  const [expensesArray, setExpensesArray] = useState([])
  const [incomeArray, setIncomeArray] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      const user = await getUser()
      const [expenses, income] = await fetchTransactions(user)
      setExpensesArray(expenses)
      setIncomeArray(income)
    }
    fetchData()
  },[])

  return(
    <>
    </>
  )
}