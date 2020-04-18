import React, { useState, useEffect } from 'react';
import { LineItem } from './LineItem'
import { lineItemTitles } from '../constants/index'



export const DCF = ({forecasts}) => {
  //pass entire set of forecasts to the DCF
  //map through each line item's array of values
  console.log(forecasts)

  return (
    <div>
      <LineItem name={lineItemTitles.revenues} values={forecasts.revenues} />
      <LineItem name={lineItemTitles.cogs} values={forecasts.cogs} />
      <LineItem name={lineItemTitles.gp} values={forecasts.gp} />

      <LineItem name={lineItemTitles.opex} values={forecasts.opex} />
      <LineItem name={lineItemTitles.ebitda} values={forecasts.ebitda} />

      <LineItem name={lineItemTitles.depreciation} values={forecasts.depreciation} />
      <LineItem name={lineItemTitles.amortization} values={forecasts.amortization} />
      <LineItem name={lineItemTitles.ebit} values={forecasts.ebit} />

      <LineItem name={lineItemTitles.taxes} values={forecasts.taxes} />
      <LineItem name={lineItemTitles.nopat} values={forecasts.nopat} />
      
      <LineItem name={lineItemTitles.depreciation} values={forecasts.depreciation} /> {/* need a way to change signs of D&A */}
      <LineItem name={lineItemTitles.amortization} values={forecasts.amortization} />
      <LineItem name={lineItemTitles.capex} values={forecasts.capex} />
      <LineItem name={lineItemTitles.nwcChange} values={forecasts.nwcChange} />
      <LineItem name={lineItemTitles.fcf} values={forecasts.fcf} />
      
      <LineItem name={lineItemTitles.discountPeriods} values={forecasts.discountPeriods} />
      <LineItem name={lineItemTitles.pvFactors} values={forecasts.pvFactors} />
      <LineItem name={lineItemTitles.dcf} values={forecasts.dcf} />

    </div>
  )
}