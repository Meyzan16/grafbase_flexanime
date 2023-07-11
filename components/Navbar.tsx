import Link from 'next/link'
import React from 'react'
import AuthProviders from './AuthProviders';

const Navbar = () => {
    const session = {};
  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href="/">
            <span className=" bg-gradient-to-r text-2xl font-semibold  
             from-amber-500 via-orange-600
              to-yellow-500 bg-clip-text text-transparent">
                Anime
            </span>
        </Link>

       
      </div>

      <div className='flexCenter gap-4'>
            {
                session ? (
                    <>
                        User Photo

                        <Link href="/create-project">
                            Share Anime
                        </Link>
                    </>
                ) : (
                    <AuthProviders />
                )
            }
      </div>
    </nav>
  )
}

export default Navbar
