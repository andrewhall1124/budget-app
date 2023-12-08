import '../globals.css'

export const metadata = {
  title: 'Budget App',
  description: 'Made by Andrew Hall',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col bg-background'>
        <main className='flex-1 flex flex-col'>
          {children}
        </main>
      </body>
    </html>
  )
}