import React from 'react'
import numeral from 'numeral'


export const TerminalValue = ({TV}) => {
  const { terminalFactor, pvFactor } = TV 
  const { terminalCF, preDiscountTV, discountedTV } = TV.values
  

  return (
    <div className="flex flex-col w-1/3 border border-blue-900 mr-12 text-blue-900">
      <p className="p-2 font-bold text-white border-b border-blue-900 mb-3 bg-blue-600">Terminal Value Calculation: </p>

      <div className="flex justify-between">
        <span className="px-2">Terminal Cash Flow:</span>
        <span className="px-2">{numeral(terminalCF).format('0.00')}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="px-2">Terminal Value Factor:</span>
        <span className="px-2">{numeral(terminalFactor).format('0.00')}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="px-2">Terminal Value:</span>
        <span className="px-2">{numeral(preDiscountTV).format('(0,0.00)')}</span>
      </div>

      <div className="flex justify-between">
        <span className="px-2">Discount Factor:</span>
        <span className="px-2">{numeral(pvFactor).format('0.00')}</span>
      </div>

      <div className="flex justify-between border-t border-blue-900">
        <span className="p-2 font-bold">Discounted Terminal Value:</span>
        <span className="p-2 font-bold">{numeral(discountedTV).format('(0,0.00)')}</span>
      </div>
    </div>
  )
}