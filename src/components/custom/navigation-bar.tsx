import Link from 'next/link'
import { Home, BookOpen, Settings } from 'lucide-react'

export function NavigationBar() {
  return (
    <nav className="shadow-2xl rounded-b-xl flex max-w-2xl mx-auto  items-center justify-between p-4">
      <Link href="/" className="flex flex-col items-center">
        <Home className="h-5 w-5" />
        <span className="text-sm">Home</span>
      </Link>
      <Link href="/courses" className="flex flex-col items-center ">
        <BookOpen className="h-5 w-5" />
        <span className="text-sm">Courses</span>
      </Link>
      <Link href="/courses" className="flex items-center space-x-2">
        <span className="text-sm">Nbari</span>
      </Link>

      <Link href="/courses" className="flex flex-col items-center ">
        <Settings className="h-5 w-5" />
        <span className="text-sm">Settings</span>
      </Link>
      <div className="h-8 w-8 rounded-full bg-yellow-400"></div>
    </nav>
  )
}
