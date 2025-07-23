import React, { useEffect } from "react";
import { useState } from "react";
import genreids from "../utility/genre"

function Watchlist({ watchList, handleRemoveFromWatchList, setWatchList }) {
  const [search, setSearch] = useState("");
  const [genrelist,setGenreList]=useState(['All Genre']);
  const [currGenre,setCurrentgenre] = useState('All Genre');

  let handleFilter=(genre)=>{
    setCurrentgenre(genre)
  }

  useEffect(()=>{
    let temp=watchList.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp=new Set(temp)
    setGenreList(['All Genre',...temp])
    console.log(temp)
  },[watchList])

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing=()=>{
    console.log("sorting inc")
    let sortedIncreasing=[...watchList].sort((movieA,movieB)=>{
      return movieA.vote_average-movieB.vote_average
    })
    setWatchList(sortedIncreasing)
  }

  let sortDecreasing=()=>{
    console.log("sorting dec")
    let sortedDecreasing=[...watchList].sort((movieA,movieB)=>{
      return movieB.vote_average-movieA.vote_average
    })
    setWatchList(sortedDecreasing)
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      <div className="flex justify-center flex-wrap m-4">
        {genrelist.map((genre)=>{
          return <div onClick={()=>{handleFilter(genre)}} className={currGenre==genre?"flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold m-4":"flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold m-4"}>
          {genre}
        </div>
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder=" search for movies"
          className="p-[5px] h-[3rem] w-[18rem] border-0.5 bg-gray-200 text-black "
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8 bg-gray-800">
        <table className="w-full text-gray-200 text-center">
          <thead className="border-b-2">
            <tr className="border-1">
              <th>Name</th>
              <th className="flex justify-center">
                  <div onClick={sortIncreasing}className="mr-2">
                    <i class="fa-solid fa-arrow-up"></i>
                  </div>
                  <div>ratings</div>
                  <div onClick={sortDecreasing} className="ml-2">
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
              </th>
              <th>popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchList.filter((movieObj)=>{
              if(currGenre=="All Genre"){
                return genreids[movieObj.genre_ids[0]]
              }
              else{
                return genreids[movieObj.genre_ids[0]]==currGenre
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-1">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className=" h-[100px] w-[80px] "
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="flex items-center ml-[25px] ">
                        <b className="ml-15">{movieObj.title} </b>
                      </div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td
                      className="text-red-500"
                      onClick={() => handleRemoveFromWatchList(movieObj)}
                    >
                      <button >delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist;
