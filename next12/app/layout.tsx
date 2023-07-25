import MyProfilePic from './components/MyProfilePic'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: "Bart&apos;s Blog",
  description: 'Create by Bart Van Hoey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark:bg-slate-800'>
        <Navbar/>
        <MyProfilePic/>
        {children}
        </body>
    </html>
  )
}
