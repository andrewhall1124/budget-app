import '../globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export const metadata = {
  title: 'Budget App',
  description: 'Made by Andrew Hall',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col bg-background'>
        <Theme>
          <main className='flex-1 flex flex-col'>
            {children}
          </main>
        </Theme>
      </body>
    </html>
  )
}