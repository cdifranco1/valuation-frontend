import React, { useEffect, useRef } from 'react';
import * as actions from '../../actions/updateInputs' 
import { connect } from 'react-redux'
import { LineItem } from './LineItem'
import { lineItemTitles, forecastSequence } from '../../constants/index'
import { TerminalValue } from './TV'
import { EnterpriseValue } from './EnterpriseValue'
import { ForecastYears } from './ForecastYears'
import ForecastInputContainer from '../inputs/ForecastInputContainer';
import { useHistory } from "react-router-dom"
import { setCredentials } from "../../actions/setCredentials"

const lineItemStyleProps = {
  flipSign: [ "cogs", "opex", "depreciation", "amortization", "capex", "nwcChange" ],
  total: ["gp", "ebitda", "ebit", "nopat", "fcf", "dcf"],
  decimal: ["partialPeriods", "discountPeriods", "pvFactors" ]
}

const DCF = (props) => {
  const history = useHistory()
  const initialMount = useRef(true)
  const { forecasts, genInputs, BEV, TV, model, submitModel, modelId, _id, idToken } = props
  const { periods, valDate } = genInputs

  const handleSubmit = (e) => {
    e.preventDefault()

    submitModel(model, modelId, idToken)
  }

  useEffect(() => {
    if (initialMount.current){
      initialMount.current = false
    } else {
      history.push(`/model/${_id}/dcf`)
    }
  }, [_id])

  return (
    <div className="flex flex-col px-10 w-9/12">
      <div className="bg-white pb-12 shadow-2xl">
        <ForecastYears periods={periods} valDate={valDate} />

        <div className="mb-5"></div>

        {forecastSequence.map((el, i) => {
          return <LineItem 
                    key={`${el}${i}`}
                    periods={periods} 
                    name={lineItemTitles[el]}
                    values={forecasts[el]}

                    flipSign={
                      //check for repeat - if it is a repeat don't want to flip sign (D&A)
                      
                      // 0(N^2) but NBD with limited forecast periods
                      lineItemStyleProps.flipSign.includes(el) &&
                      !forecastSequence.slice(0, i).includes(el)
                    }

                    total={lineItemStyleProps.total.includes(el)}
                    decimal={lineItemStyleProps.decimal.includes(el)}
                  />
        })}

        <div className="flex justify-between">
          <EnterpriseValue BEV={BEV} TV={TV} />
          <TerminalValue TV={TV} />
        </div>

        <button type="button" className="shadow-lg ml-4 py-4 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:shadow-outline" onClick={handleSubmit}>
          Calculate and  Save DCF Model
        </button>
      </div>
        
      <ForecastInputContainer />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { forecasts, genInputs, BEV, TV, discounting, valAssumps, _id } = state.dcf
  const { idToken } = state.credentials

  return {
    _id,
    forecasts: {
      ...forecasts,
      ...discounting
    },
    genInputs,
    valAssumps,
    BEV,
    TV,
    model: {
      ...state.dcf
    },
    idToken
  }
}

const { submitModel } = actions 

export default connect( mapStateToProps, { submitModel, setCredentials } )( DCF )


