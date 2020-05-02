import React from 'react';
import { LineItem } from './LineItem'
import { lineItemTitles } from '../../../constants/index'
import { TerminalValue } from './TV'
import { EnterpriseValue } from './EnterpriseValue'
import { ForecastYears } from './ForecastYears'


export const DCF = ({model}) => {
  const { forecasts, genInputs, BEV, TV, discounting } = model

  const { periods, valDate } = genInputs

  return (
    <div className="bg-white pb-12 shadow-2xl">
      <ForecastYears periods={periods} valDate={valDate} />

      <div className="mb-5"></div>

      <LineItem periods={periods} name={lineItemTitles.revenues} values={forecasts.revenues} />
      <LineItem periods={periods} name={lineItemTitles.cogs} values={forecasts.cogs} flipSign />
      <LineItem periods={periods} total name={lineItemTitles.gp} values={forecasts.gp} />

      <LineItem periods={periods} name={lineItemTitles.opex} values={forecasts.opex} flipSign />
      <LineItem periods={periods} total name={lineItemTitles.ebitda} values={forecasts.ebitda} />

      <LineItem periods={periods} name={lineItemTitles.depreciation} values={forecasts.depreciation} flipSign />
      <LineItem periods={periods} name={lineItemTitles.amortization} values={forecasts.amortization} flipSign />
      <LineItem periods={periods} total name={lineItemTitles.ebit} values={forecasts.ebit} />

      <LineItem periods={periods} name={lineItemTitles.taxes} values={forecasts.taxes} />
      <LineItem periods={periods} total name={lineItemTitles.nopat} values={forecasts.nopat} />
      
      <LineItem periods={periods} name={lineItemTitles.depreciation} values={forecasts.depreciation} />
      <LineItem periods={periods} name={lineItemTitles.amortization} values={forecasts.amortization} />
      <LineItem periods={periods} name={lineItemTitles.capex} values={forecasts.capex} flipSign />
      <LineItem periods={periods} name={lineItemTitles.nwcChange} values={forecasts.nwcChange} flipSign />
      <LineItem periods={periods} total name={lineItemTitles.fcf} values={forecasts.fcf} />
      
      {/* discounting */}
      <LineItem periods={periods} name={lineItemTitles.partialPeriod} values={discounting.partialPeriods} decimal />

      <LineItem periods={periods} name={lineItemTitles.discountPeriods} values={discounting.discountPeriods} decimal />
      <LineItem periods={periods} name={lineItemTitles.pvFactors} values={discounting.pvFactors} decimal />

      <LineItem periods={periods} total name={lineItemTitles.dcf} values={forecasts.dcf} />

      <div className="flex justify-between">
        <EnterpriseValue BEV={BEV} TV={TV} />
        <TerminalValue TV={TV} />
      </div>

    </div>
  )
}