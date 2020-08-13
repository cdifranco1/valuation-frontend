import React, { useState } from 'react';
import numeral from 'numeral';

export const LineItem = ({name, values, periods, total, decimal, flipSign}) => {
  const [ editable, setEditable ] = useState(false)
  const formatNum = (num, flipSign, decimal) => {
    const signedNum = flipSign ? num * -1 : num
    if (decimal){
      return numeral(signedNum).format('0.00')
    }
    return numeral(signedNum).format('(0,0)')
  }

  return (
    <div className="flex px-2 w-full">
      <p className={`w-1/5 ${total && 'font-bold'} text-sm text-blue-900`}>{name}</p>
      <div className={`flex w-full ${total && 'border-t border-blue-900 mb-8'}`}>
      {values.map((el, index) =>
        <span key={index} className={`w-1/${periods} ${total ? 'font-bold' : null} text-sm text-right`}>{formatNum(el, flipSign, decimal)}</span>
      )}
      </div>
    </div>
  )
}

