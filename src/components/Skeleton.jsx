import React from 'react';

// Movie card skeleton
export function MovieCardSkeleton() {
  return (
    <div className="relative w-[200px] h-[50vh] rounded-xl bg-gray-700 animate-pulse flex flex-col justify-end mt-[25px]">
      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-600 rounded-lg"></div>
      <div className="h-16 bg-gray-600 rounded-b-xl"></div>
    </div>
  );
}

// Movie details skeleton
export function MovieDetailsSkeleton() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 flex flex-col items-center">
      <div className="mb-8 px-4 py-2 bg-gray-700 rounded animate-pulse w-20 h-10"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="w-[220px] h-[330px] bg-gray-700 rounded-lg mb-6 md:mb-0 md:mr-8 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search results skeleton
export function SearchResultsSkeleton() {
  return (
    <div className="bg-gray-900 p-5 min-h-screen">
      <div className="text-white font-display text-3xl md:text-5xl font-bold text-center mb-6">
        <div className="h-12 bg-gray-700 rounded animate-pulse mx-auto w-64"></div>
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-8 min-h-[60vh]">
        {[...Array(8)].map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

// Movies grid skeleton
export function MoviesGridSkeleton() {
  return (
    <div className="bg-gray-900 p-5 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="h-12 bg-gray-700 rounded animate-pulse mb-4 md:mb-0 w-48"></div>
        <div className="h-10 bg-gray-700 rounded animate-pulse w-32"></div>
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-8 min-h-[60vh]">
        {[...Array(12)].map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

// Watchlist skeleton
export function WatchlistSkeleton() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-5">
      <div className="flex justify-center flex-wrap m-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-12 w-32 bg-gray-700 rounded-xl m-4 animate-pulse"></div>
        ))}
      </div>
      <div className="flex justify-center my-4">
        <div className="h-12 w-72 bg-gray-700 rounded animate-pulse"></div>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8 bg-gray-800">
        <div className="w-full text-gray-200 text-center">
          <div className="border-b-2 p-4">
            <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-b p-4">
              <div className="flex items-center">
                <div className="h-20 w-16 bg-gray-700 rounded animate-pulse"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCardSkeleton; 