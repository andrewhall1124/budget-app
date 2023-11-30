'use client'
import { Footer, Header } from "@/app/components"

export default function Layout({ children }) {
  return (
    <>
      <Header/>
        <main className='flex-1 flex flex-col mt-12 mb-28'>
          {children}
        </main>
      <Footer/>
    </>
  )
}