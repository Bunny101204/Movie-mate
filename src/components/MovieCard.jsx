import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = React.memo(function MovieCard({watchList,handleRemoveFromWatchList, movieObject,poster_path, title,handleAddToWatchList }) {
  const navigate = useNavigate();

  function doesContain(movieObj){
    for(let i=0;i<watchList.length;i++){
      if(watchList[i].id==movieObj.id){
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className='relative w-[200px] h-[50vh] hover:cursor-pointer hover:scale-110 hover:duration-300 rounded-xl bg-cover bg-center flex flex-col justify-end mt-[25px]'
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}
      onClick={() => navigate(`/movies/details/${movieObject.id}`)}
    >
      {doesContain(movieObject)?
        <div
          className='absolute top-2 right-2 text-2xl bg-gray-900/50 rounded-lg z-10'
          onClick={e => { e.stopPropagation(); handleRemoveFromWatchList(movieObject); }}
        >&#10060;</div >:
        <div
          className='absolute top-2 right-2 text-2xl bg-gray-900/50 rounded-lg z-10'
          onClick={e => { e.stopPropagation(); handleAddToWatchList(movieObject); }}
        >&#128151; </div>
      }
      <div className='text-white p-2 w-full text-xl text-center bg-gray-900/60'>
        {title}
      </div>
    </div>
  )
})

export default MovieCard