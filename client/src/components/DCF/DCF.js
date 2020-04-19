import React from 'react';
import { LineItem } from './LineItem'
import { lineItemTitles } from '../../constants/index'
import { TerminalValue } from './TV'
import { EnterpriseValue } from './EnterpriseValue'


export const DCF = ({forecasts, years, inputs}) => {
  return (
    <div>
      <LineItem years={years} name={lineItemTitles.revenues} values={forecasts.revenues} />
      <LineItem years={years} name={lineItemTitles.cogs} values={forecasts.cogs} flipSign />
      <LineItem years={years} total name={lineItemTitles.gp} values={forecasts.gp} />

      <LineItem years={years} name={lineItemTitles.opex} values={forecasts.opex} flipSign />
      <LineItem years={years} total name={lineItemTitles.ebitda} values={forecasts.ebitda} />

      <LineItem years={years} name={lineItemTitles.depreciation} values={forecasts.depreciation} flipSign />
      <LineItem years={years} name={lineItemTitles.amortization} values={forecasts.amortization} flipSign />
      <LineItem years={years} total name={lineItemTitles.ebit} values={forecasts.ebit} />

      <LineItem years={years} name={lineItemTitles.taxes} values={forecasts.taxes} />
      <LineItem years={years} total name={lineItemTitles.nopat} values={forecasts.nopat} />
      
      <LineItem years={years} name={lineItemTitles.depreciation} values={forecasts.depreciation} />
      <LineItem years={years} name={lineItemTitles.amortization} values={forecasts.amortization} />
      <LineItem years={years} name={lineItemTitles.capex} values={forecasts.capex} flipSign />
      <LineItem years={years} name={lineItemTitles.nwcChange} values={forecasts.nwcChange} flipSign />
      <LineItem years={years} total name={lineItemTitles.fcf} values={forecasts.fcf} />
      
      <LineItem years={years} name={lineItemTitles.discountPeriods} values={forecasts.discountPeriods} decimal />
      <LineItem years={years} name={lineItemTitles.pvFactors} values={forecasts.pvFactors} decimal />
      <LineItem years={years} total name={lineItemTitles.dcf} values={forecasts.dcf} />

      <div className="flex justify-between">
        <EnterpriseValue forecasts={forecasts}/>
        <TerminalValue forecasts={forecasts} inputs={inputs}/>
      </div>

    </div>
  )
}