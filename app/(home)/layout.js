import '../globals.css'
import { Footer } from '../components'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col bg-background'>
        <main className=' flex-1 flex flex-col mb-36'>
          {children}
        </main>
        <Footer/>  
      </body>
    </html>
  )
}