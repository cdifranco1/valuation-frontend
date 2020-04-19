import React from 'react';


export const LineItem = ({name, values, years, total, round}) => {
  console.log(values)
  
  const roundFloat = (num, precision) => {
    return Math.round(Number(num) * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  return (
    <div className="flex">
      <h3 className={`w-1/5 ${total && 'font-bold'}`}>{name}</h3>
      <div className={`flex w-full ${total && 'border-t border-black'}`}>
      {values.map(el => 
        <span className={`w-1/${years} ${total && 'mb-8'} text-right`}>{round ? roundFloat(el, round) : el}</span>
      )}
      </div>
    </div>
  )
}