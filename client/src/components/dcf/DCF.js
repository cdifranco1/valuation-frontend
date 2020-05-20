import React from 'react';
import * as actions from '../../actions/updateInputs' 
import { connect } from 'react-redux'
import { LineItem } from './LineItem'
import { lineItemTitles } from '../../constants/index'
import { TerminalValue } from './TV'
import { EnterpriseValue } from './EnterpriseValue'
import { ForecastYears } from './ForecastYears'
import ForecastInputContainer from '../inputs/ForecastInputContainer';


const DCF = (props) => {
  console.log(props)
  const { forecasts, genInputs, BEV, TV, discounting, model, submitModel, modelId } = props
  const { periods, valDate } = genInputs

  const handleSubmit = (e) => {
    console.log(model)
    console.log(modelId)
    e.preventDefault()

    submitModel(model, modelId)
  } 

  return (
    <div className="flex flex-col w-full">
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
        
        
        <LineItem periods={periods} name={lineItemTitles.partialPeriod} values={discounting.partialPeriods} decimal />

        <LineItem periods={periods} name={lineItemTitles.discountPeriods} values={discounting.discountPeriods} decimal />
        <LineItem periods={periods} name={lineItemTitles.pvFactors} values={discounting.pvFactors} decimal />

        <LineItem periods={periods} total name={lineItemTitles.dcf} values={forecasts.dcf} />

        <div className="flex justify-between">
          <EnterpriseValue BEV={BEV} TV={TV} />
          <TerminalValue TV={TV} />
        </div>


        <button type="button" className="shadow-lg w-1/6 ml-4 mt-10 py-4 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Calculate and Save DCF Model</button>
      </div>
        
      <ForecastInputContainer />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { forecasts, genInputs, BEV, TV, discounting, valAssumps } = state

  return {
    forecasts,
    genInputs,
    valAssumps,
    BEV,
    TV,
    discounting,
    model: {
      ...state
    }
  }
}

// const mapDispatchToProps = dispatch => {
//   const { updateAll } = actions

//   return {
//     updateAll
//   }
// }
const { submitModel } = actions 

export default connect( mapStateToProps, { submitModel } )( DCF )


