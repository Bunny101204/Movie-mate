import React from 'react'

const Banner = React.memo(function Banner({ movie }) {
  if (!movie) return null;
  return (
    <div className="h-[80vh] w-[100vw] bg-cover bg-center flex flex-col-reverse" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path})`}}>
      <div className='opacity-75 text-white text-center bg-gray-900 text-2xl w-full p-4'>
        {movie.title || movie.name}
      </div>
    </div>
  )
})

export default Banner