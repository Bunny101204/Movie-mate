import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";

function App() {

  let [watchList,setWatchList]=useState([])

  let handleAddToWatchList=(object)=>{
    let newWatchList=[...watchList,object]
    localStorage.setItem("movieApp",JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }

  let handleRemoveFromWatchList=(object)=>{
    let filteredWatchList=watchList.filter((movie)=>{
      return movie.id!==object.id
    })
    localStorage.setItem("movieApp",JSON.stringify(filteredWatchList));
    setWatchList(filteredWatchList)
    console.log(filteredWatchList)
  }
  useEffect(()=>{
      let moviesFromLocalStorage=localStorage.getItem('movieApp')
      if(moviesFromLocalStorage){
        setWatchList(JSON.parse(moviesFromLocalStorage));
      }
      
    },[])
  
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies watchList={watchList} handleAddToWatchList={handleAddToWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>
              </>
            }
          ></Route>

          <Route path="/watchlist"  element={<Watchlist watchList={watchList} handleRemoveFromWatchList={handleRemoveFromWatchList} setWatchList={setWatchList} /> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;




// https://api.themoviedb.org/3/movie/popular?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&language=en-US&page=1