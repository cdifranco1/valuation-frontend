import React from 'react';
import numeral from 'numeral';

export const LineItem = ({name, values, periods, total, decimal, flipSign}) => {
  const formatNum = (num, flipSign, decimal) => {
    const signedNum = flipSign ? num * -1 : num
    if (decimal){
      return numeral(signedNum).format('0.00')
    }
    return numeral(signedNum).format('(0,0)')
  }

  return (
    <div className="flex px-2 w-full">
      <p className={`w-1/5 ${total && 'font-bold'} text-blue-900 text-lg`}>{name}</p>
      <div className={`flex w-full ${total && 'border-t border-blue-900 mb-8'}`}>
      {values.map((el, index) =>
        <span key={index} className={`w-1/${periods} ${total ? 'font-bold' : null} text-right`}>{formatNum(el, flipSign, decimal)}</span>
      )}
      </div>
    </div>
  )
}