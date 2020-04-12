import React, { useState, useReducer } from 'react';
import axios from 'axios'
import { axiosBase } from '../utils'
import { Forecasts } from './Forecasts';
import { ForecastInputs } from './ForecastInputs';
import { GeneralInputs } from './GeneralInputs';
import { initialState, modelReducer } from './ForecastsReducer';
import { ValAssumps } from './ValuationInputs';



export const Model = () => {
  const [ state, dispatch ] = useReducer(modelReducer, initialState)

  const updateState = (actionType, payload) => {
   dispatch({type: actionType, payload: payload})

   console.log(state)
  }

  const submitModel = (e) => {
    e.preventDefault()

    axiosBase()
      .post('/', state)
      .then(res => console.log(res))    
  }
  
  return (
    <div>
      {Object.keys(state.forecasts).map((el, index) => {
       return  <Forecasts key={index} projections={state.forecasts[el]} lineItem={el} />
      }
      )}
      <GeneralInputs updateState={updateState} />
      {Object.keys(state.forecasts).map((el, index) => {
        return <ForecastInputs updateState={updateState} key={index} lineItem={el} />
        }
      )}
      <ValAssumps updateState={updateState} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}