import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="text-center text-white text-3xl bg-gradient-to-br from-cyan-500 to-blue-800 h-screen flex justify-center
    items-center flex-col p-4  font-bold">
      <div className='drop-shadow-2xl text-3xl sm:text-5xl'>Welcome to Pokemon!</div>
      <div className="text-base sm:text-2xl font-thin drop-shadow-2xl ">
        Create , find and play with Pokemon.
      </div>
      <button className=' mt-8 text-base bg-transparent hover:bg-white text-white font-semibold hover:text-blue-500 py-2 px-4 border border-white-500 hover:border-transparent rounded'>
          <Link href='/Pokemon'>
            Get Started
          </Link>
      </button>
    </div>
  )
}
