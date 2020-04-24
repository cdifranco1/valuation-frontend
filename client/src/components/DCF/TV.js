import React from 'react'
import numeral from 'numeral'


export const TerminalValue = ({TV}) => {
  const { terminalCF, preDiscountTV, discountedTV, terminalFactor } = TV 
  

  return (
    <div className="flex flex-col w-1/6 border border-black mr-12">
      <p className="p-2 text-lg font-bold border-black border-b mb-3">Terminal Value Calculation: </p>

      <div className="flex justify-between">
        <span className="px-2">Terminal Cash Flow: </span>
        <span className="px-2">{numeral(terminalCF).format('0.00')}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="px-2">Terminal Value Factor: </span>
        <span className="px-2">{numeral(terminalFactor).format('0.00')}</span>
      </div>
      
      {/* <div className="flex justify-between">
        <span className="px-2">Discount Factor: </span>
        <span className="px-2">{numeral(discountFactor).format('0.00')}</span>
      </div> */}

      <div className="flex justify-between border-t border-black">
        <span className="p-2 font-bold">Terminal Value: </span>
        <span className="p-2 font-bold">{numeral(preDiscountTV).format('(0,0.00)')}</span>
      </div>
    </div>
  )
}