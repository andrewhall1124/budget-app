import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Link from 'next/link';
import { PlusIcon, PersonIcon } from '@radix-ui/react-icons';

function Header(){
  return(
    <div className='fixed bg-background w-full top-0 h-12 z-40'>
      <div className='flex justify-end items-center gap-2 h-full px-4'>
        <Link href='add'>
          <button>
            <PlusIcon/>
          </button>
        </Link>
        <Link href={`/account`}>
          <button>
            <PersonIcon/>
          </button>
        </Link>
      </div>
    </div>
  )
}

function Footer(){
  return(
    <footer className='bg-main fixed w-full bottom-0 h-28 shadow-lg z-40 pb-8 px-8'>
      <div className='flex justify-between items-center h-full'>
        <Link href='/'>
          <div className='flex flex-col items-center w-24'>
            <div className='text-contrast text-sm'>Transactions</div>
          </div>
        </Link>
        {/* <Link href='/budgets'>
          <div className='flex flex-col items-center w-24'>
            <div className='text-contrast text-sm'>Budgets</div>
          </div>
        </Link>
        <Link href='/cards'>
          <div className='flex flex-col items-center w-24'>
            <div className='text-contrast text-sm'>Cards</div>
          </div>
        </Link> */}
      </div>
    </footer> 
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col bg-background'>
        <Theme appearance='dark'>
          <Header/>
          <main className='flex-1 flex flex-col mt-12 mb-28'>
            {children}
          </main>
          <Footer/>
        </Theme>
      </body>
    </html>
  )
}