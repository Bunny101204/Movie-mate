import React, { useState } from 'react'
import logo from "../clapImage.jpg"
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/movies/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  }

  return (
    <nav className='bg-gray-900 flex border space-x-8 items-center pl-3 py-1' role="navigation" aria-label="Main navigation">
        <img className="w-[50px]" src={logo} alt="Movie Mate Logo" />
        <Link to="/movies/trending" className='text-white text-2xl' aria-label="Go to trending movies">Movies</Link>
        <Link to="/watchList" className='text-white text-2xl' aria-label="Go to watchlist">watchlist</Link>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search movies..."
          className="ml-4 px-3 py-1 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          style={{ minWidth: 180 }}
          aria-label="Search for movies"
          aria-describedby="search-description"
        />
        <span id="search-description" className="sr-only">Press Enter to search for movies</span>
    </nav>
  )
}

export default NavBar