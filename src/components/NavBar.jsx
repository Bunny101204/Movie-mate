import React from 'react'
import logo from "../clapImage.jpg"

import { Link } from 'react-router'

function NavBar() {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-1'>
        <img className="w-[50px]" src={logo} alt="" />
        <Link to="/" className='text-blue-500 text-2xl font-bold'>Movies</Link>
        <Link to="/watchList" className='text-blue-500 text-2xl font-bold'>watchlist</Link>

    </div>
  )
}

export default NavBar