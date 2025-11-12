import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import { useParams, useNavigate } from "react-router-dom";
import { MoviesGridSkeleton } from "./Skeleton";

const MOVIE_LISTS = [
  { label: "Trending", value: "trending" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Now Playing", value: "now_playing" },
];

function Movies({
  watchList,
  handleRemoveFromWatchList,
  handleAddToWatchList,
  listType,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  // Validate listType
  const validListType = MOVIE_LISTS.some(l => l.value === listType) ? listType : "trending";

  function handleNext() {
    setPageNo(pageNo + 1);
  }
  function handlePrev() {
    if (pageNo !== 1) {
      setPageNo(pageNo - 1);
    }
  }

  useEffect(() => {
    setLoading(true);
    let url = "";
    if (validListType === "trending") {
      url = `https://api.themoviedb.org/3/trending/movie/week?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&page=${pageNo}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${validListType}?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&language=en-US&page=${pageNo}`;
    }
    //to set the Loading true or false when the component is loading
    axios.get(url).then(function (res) {
      setMovies(res.data.results);
      setLoading(false);
    });
  }, [pageNo, validListType]);

  // Reset page number when list changes
  useEffect(() => {
    setPageNo(1);
  }, [validListType]);

  // When dropdown changes, update the route
  function handleListChange(e) {
    const newList = e.target.value;
    navigate(`/movies/${newList}`);
  }

  // If the URL param is invalid, redirect to trending
  useEffect(() => {
    if (!MOVIE_LISTS.some(l => l.value === listType)) {
      navigate('/movies/trending', { replace: true });
    }
    // eslint-disable-next-line
  }, [listType]);

  if (loading) {
    return <MoviesGridSkeleton />;
  }

  return (
    <div className="bg-gray-900 p-5 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="text-white font-display text-3xl md:text-5xl font-bold text-center md:text-left mb-4 md:mb-0">
          {MOVIE_LISTS.find((l) => l.value === validListType)?.label} Movies
        </div>
        <select
          className="rounded px-4 py-2 text-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={validListType}
          onChange={handleListChange}
        >
          {MOVIE_LISTS.map((list) => (
            <option key={list.value} value={list.value}>
              {list.label}
            </option>
          ))}
        </select>
      </div>
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
    </div>
  );
}

export default Movies;
