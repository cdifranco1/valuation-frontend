import React from 'react';
import numeral from 'numeral';

export const LineItem = ({name, values, years, total, decimal, flipSign}) => {

  const formatNum = (num, flipSign, decimal) => {
    const signedNum = flipSign ? num * -1 : num
    if (decimal){
      return numeral(signedNum).format('0.00')
    }
    return numeral(signedNum).format('(0,0)')
  }
      

  return (
    <div className="flex">
      <h3 className={`w-1/5 ${total && 'font-bold'}`}>{name}</h3>
      {<p></p>}
      <div className={`flex w-full ${total && 'border-t border-black'}`}>
      {values.map(el =>
        <span className={`w-1/${years} ${total && 'mb-8 font-bold'} text-right`}>{formatNum(el, flipSign, decimal)}</span>
      )}
      </div>
    </div>
  )
}