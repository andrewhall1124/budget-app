'use client'

import { Footer, Header } from "@/app/components"

export default function Layout({ children }) {
  
  return (
    <>
      <Header/>
        <main className='flex-1 flex flex-col'>
          {children}
        </main>
      <Footer/>
    </>
  )
}