import React from 'react'
import numeral from 'numeral'


export const TerminalValue = ({inputs, forecasts}) => {
  const { ltgr, wacc } = inputs.valAssumps
  const { fcf, TV } = forecasts

  const termCashFlow = fcf[fcf.length - 1] * (1 + Number(ltgr)/100)  
  const termFactor = (1 / (Number(wacc)/100 - Number(ltgr)/100))
  const discountFactor = forecasts.pvFactors[forecasts.pvFactors.length - 1]

  return (
    <div className="flex flex-col w-1/6 border border-black mr-12">
      <p className="p-2 text-lg font-bold border-black border-b mb-3">Terminal Value Calculation: </p>

      <div className="flex justify-between">
        <span className="px-2">Terminal Cash Flow: </span>
        <span className="px-2">{numeral(termCashFlow).format('0.00')}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="px-2">Terminal Value Factor: </span>
        <span className="px-2">{numeral(termFactor).format('0.00')}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="px-2">Discount Factor: </span>
        <span className="px-2">{numeral(discountFactor).format('0.00')}</span>
      </div>

      <div className="flex justify-between border-t border-black">
        <span className="p-2 font-bold">Terminal Value: </span>
        <span className="p-2 font-bold">{numeral(TV).format('(0,0.00)')}</span>
      </div>
    </div>
  )
}