import React from "react"

export default ({ buttonText, onClick, direction }) => {
  return (
    direction === "right" ?
    <button type="button" onClick={onClick} className="mx-1 flex justify-between items-center p-4 w-full mt-3 bg-white text-blue-800 shadow-md focus:outline-none focus:shadow-outline hover:bg-blue-700 arrow-fill hover:text-white">     
      {buttonText}
      <svg className="h-8 w-8 fill-current text-blue-700 hover:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
      </svg>
    </button>
    : direction === "left" ?
    <button type="button" onClick={onClick} className="mx-1 flex justify-between items-center p-4 w-full mt-3 bg-white text-blue-800 shadow-md focus:outline-none focus:shadow-outline hover:bg-blue-700 arrow-fill hover:text-white">
      <svg className="h-8 w-8 fill-current text-blue-700 hover:fill-current transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
      </svg>
      {buttonText}
    </button> :
    null
  )
}