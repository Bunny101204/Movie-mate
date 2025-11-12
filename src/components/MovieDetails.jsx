import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MovieDetailsSkeleton } from "./Skeleton";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=0e834bd7b0b6ce4d6010cc5bbfbfe0bc&language=en-US`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }
  if (!movie) {
    return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white text-2xl">Movie not found.</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 flex flex-col items-center">
      <button
        className="mb-8 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
          className="w-[220px] h-[330px] object-cover rounded-lg mb-6 md:mb-0 md:mr-8 shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="mb-4 text-gray-300">{movie.overview}</div>
          <div className="mb-2">
            <span className="font-semibold">Genres:</span> {movie.genres.map(g => g.name).join(", ")}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Rating:</span> {movie.vote_average} / 10
          </div>
          <div className="mb-2">
            <span className="font-semibold">Popularity:</span> {movie.popularity}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 