import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Banner from "./components/Banner";
import axios from "axios";
import SearchResults from "./components/SearchResults";
import MovieDetails from "./components/MovieDetails";

function MoviesWithBanner({ watchList, handleAddToWatchList, handleRemoveFromWatchList, trendingMovies }) {
  // Get listType from URL params
  const { listType } = useParams();
  // Pick a random trending movie for the banner
  const [randomTrendingMovie, setRandomTrendingMovie] = React.useState(null);
  React.useEffect(() => {
    if (trendingMovies.length > 0) {
      setRandomTrendingMovie(trendingMovies[Math.floor(Math.random() * trendingMovies.length)]);
    }
  }, [trendingMovies]);
  return (
    <>
      <Banner movie={randomTrendingMovie} />
      <Movies
        watchList={watchList}
        handleAddToWatchList={handleAddToWatchList}
        handleRemoveFromWatchList={handleRemoveFromWatchList}
        listType={listType}
      />
    </>
  );
}

function App() {
  let [watchList, setWatchList] = useState([]);
  let [trendingMovies, setTrendingMovies] = useState([]);

  let handleAddToWatchList = (object) => {
    let newWatchList = [...watchList, object];
    localStorage.setItem("movieApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  let handleRemoveFromWatchList = (object) => {
    let filteredWatchList = watchList.filter((movie) => {
      return movie.id !== object.id;
    });
    localStorage.setItem("movieApp", JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList);
    console.log(filteredWatchList);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('movieApp');
    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []);

  // Fetch trending movies for banner
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc`)
      .then(function (res) {
        setTrendingMovies(res.data.results || []);
      });
  }, []);

  return (
    <>
      <BrowserRouter >
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/movies/trending" replace />} />
          <Route
            path="/movies/:listType"
            element={
              <MoviesWithBanner
                watchList={watchList}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                trendingMovies={trendingMovies}
              />
            }
          />
          <Route
            path="/movies/search/:query"
            element={
              <SearchResults
                watchList={watchList}
                handleAddToWatchList={handleAddToWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
          <Route
            path="/movies/details/:id"
            element={<MovieDetails />}
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchList={watchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                setWatchList={setWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;




// https://api.themoviedb.org/3/movie/popular?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&language=en-US&page=1
