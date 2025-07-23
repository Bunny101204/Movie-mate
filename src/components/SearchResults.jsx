import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import axios from "axios";

function SearchResults({ watchList, handleAddToWatchList, handleRemoveFromWatchList }) {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&language=en-US&query=${encodeURIComponent(query)}&page=${pageNo}`)
      .then((res) => {
        setMovies(res.data.results || []);
        setTotalPages(res.data.total_pages || 1);
        setLoading(false);
      });
  }, [query, pageNo]);

  useEffect(() => {
    setPageNo(1);
  }, [query]);

  function handleNext() {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
  }
  function handlePrev() {
    if (pageNo > 1) setPageNo(pageNo - 1);
  }

  return (
    <div className="bg-gray-900 p-5 min-h-screen">
      <div className="text-white font-display text-3xl md:text-5xl font-bold text-center mb-6">
        Search Results for "{query}"
      </div>
      {loading ? (
        <div className="text-white text-center text-2xl py-10">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="text-white text-center text-2xl py-10">No results found.</div>
      ) : (
        <>
          <div className="flex flex-row flex-wrap justify-around gap-8 min-h-[60vh]">
            {movies.map((movieObj) => (
              <MovieCard
                key={movieObj.id}
                movieObject={movieObj}
                title={movieObj.title}
                poster_path={movieObj.poster_path}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchList={watchList}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults; 