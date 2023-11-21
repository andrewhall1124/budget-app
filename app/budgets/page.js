'use client'
import React from "react"
import { useState } from "react"
import { SelectQuestion, Card, CardTitle } from "../components"

export default function Budgets(){
  const [month, setMonth] = useState('November')
  const monthMenu = [
    'September',
    'October',
    'November'
  ]

  const tableHeaders = [
    'Category',
    'Budget',
    'Actual'
  ]

  const tableRows = [
    {
      'category': 'Groceries',
      'budget': 100,
      'actual': 50,
    },
    {
      'category': 'Groceries',
      'budget': 100,
      'actual': 50,
    },
    {
      'category': 'Groceries',
      'budget': 100,
      'actual': 50,
    },
  ]

  return(
    <div>
      <Card>
        <CardTitle>Budget</CardTitle>
        <SelectQuestion value={month} setValue={setMonth} menu={monthMenu}>Month</SelectQuestion>
        <table>
          <thead >
            <tr className="text-left">
              {tableHeaders.map((header, index) =>(
                <th key={index} className="bg-main text-white p-1">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) =>(
              <tr key={index} className={index % 2 == 0 ? 'bg-background' : 'bg-contrast'}>
                <td className="p-1">{row.category}</td>
                <td className="p-1">{row.budget}</td>
                <td className="p-1">{row.actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}