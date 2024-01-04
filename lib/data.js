// Get + Fetch

'use server'

import supabase from "./supabase"
import dayjs from "dayjs";

export async function fetchTransactions(userId){
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select()
      .eq('user_id', userId)
    if (error) {
      console.log(error);
    } 
    else {
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

      return [expensesArray, incomeArray]
    }
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
  }
};