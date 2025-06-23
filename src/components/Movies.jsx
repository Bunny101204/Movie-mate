import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({watchList,handleRemoveFromWatchList,handleAddToWatchList}) {
  const [movies, setMovies] = useState([]);
  const [pageNo,setPageNo] = useState(2)
  
    function handleNext(){
      setPageNo(pageNo+1);
    }
    function handlePrev(){
      if(pageNo!=1){
        setPageNo(pageNo-1);
      }
    }
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-xl font-bold text-center">Trending Movies</div>
      <div className=" flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              movieObject={movieObj}
              title={movieObj.title}
              poster_path={movieObj.poster_path} handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchList={watchList}
            />
          );
        })}
        <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev}/>
      </div>
    </div>
  );
}

export default Movies;
