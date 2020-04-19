import React from 'react';
import { LineItem } from './LineItem'
import { lineItemTitles } from '../constants/index'



export const DCF = ({forecasts, years}) => {
  //pass entire set of forecasts to the DCF
  //map through each line item's array of values
  console.log(forecasts)

  return (
    <div>
      <LineItem years={years} name={lineItemTitles.revenues} values={forecasts.revenues} />
      <LineItem years={years} name={lineItemTitles.cogs} values={forecasts.cogs} />
      <LineItem years={years} total name={lineItemTitles.gp} values={forecasts.gp} />

      <LineItem years={years} name={lineItemTitles.opex} values={forecasts.opex} round={2} />
      <LineItem years={years} total name={lineItemTitles.ebitda} values={forecasts.ebitda} />

      <LineItem years={years} name={lineItemTitles.depreciation} values={forecasts.depreciation} />
      <LineItem years={years} name={lineItemTitles.amortization} values={forecasts.amortization} />
      <LineItem years={years} total name={lineItemTitles.ebit} values={forecasts.ebit} />

      <LineItem years={years} name={lineItemTitles.taxes} values={forecasts.taxes} />
      <LineItem years={years} total name={lineItemTitles.nopat} values={forecasts.nopat} />
      
      <LineItem years={years} name={lineItemTitles.depreciation} values={forecasts.depreciation} /> {/* need a way to change signs of D&A */}
      <LineItem years={years} name={lineItemTitles.amortization} values={forecasts.amortization} />
      <LineItem years={years} name={lineItemTitles.capex} values={forecasts.capex} />
      <LineItem years={years} name={lineItemTitles.nwcChange} values={forecasts.nwcChange} />
      <LineItem years={years} total name={lineItemTitles.fcf} values={forecasts.fcf} />
      
      <LineItem years={years} name={lineItemTitles.discountPeriods} values={forecasts.discountPeriods} round={4} /> {/* need to round these floats */}
      <LineItem years={years} name={lineItemTitles.pvFactors} values={forecasts.pvFactors} round={4} /> {/* need to round these floats */}
      <LineItem years={years} total name={lineItemTitles.dcf} values={forecasts.dcf} round={2} />

    </div>
  )
}