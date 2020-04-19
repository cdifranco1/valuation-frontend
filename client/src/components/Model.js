import React, { useReducer } from 'react';
import { axiosBase } from '../utils/utils'
import { DCF } from './DCF';
import { ForecastInputs } from './ForecastInputs';
import { GeneralInputs } from './GeneralInputs';
import { initialState, modelReducer } from './ForecastsReducer';
import { ValAssumps } from './ValuationInputs';


import { forecasts } from '../constants'


export const Model = () => {
  const [ state, dispatch ] = useReducer(modelReducer, initialState)

  const updateState = (actionType, payload) => {
   dispatch({type: actionType, payload: payload})
  }

  const submitModel = (e) => {
    e.preventDefault()

    axiosBase()
      .post('/', state)
      .then(res => console.log(res))    
  }
  
  console.log(state)

  return (
    <div>
      <DCF forecasts={forecasts} years={state.genInputs.periods} />
      <GeneralInputs updateState={updateState} />
      {Object.keys(state.forecasts).map((el, index) =>
        <ForecastInputs updateState={updateState} key={index} lineItem={el} />
      )}
      <ValAssumps updateState={updateState} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}