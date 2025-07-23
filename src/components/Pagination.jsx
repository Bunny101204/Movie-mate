import React from 'react'

const Pagination = React.memo(function Pagination({ pageNo, handlePrev, handleNext }) {
  return (
    <div className='flex items-center space-x-4 bg-gray-800 rounded-lg px-6 py-2 shadow-md'>
      <button
        className='px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-blue-600 transition-colors duration-200 disabled:opacity-40'
        onClick={handlePrev}
        disabled={pageNo === 1}
        aria-label='Previous page'
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <span className='font-bold text-lg text-white'>{pageNo}</span>
      <button
        className='px-3 py-1 rounded-full bg-gray-700 text-white hover:bg-blue-600 transition-colors duration-200'
        onClick={handleNext}
        aria-label='Next page'
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  )
})

export default Pagination