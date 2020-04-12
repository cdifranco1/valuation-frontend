import React, { useState, useReducer } from 'react';
import axios from 'axios'
import { axiosBase } from '../utils'
import { Forecasts } from './Forecasts';
import { ForecastInputs } from './ForecastInputs';
import { GeneralInputs } from './GeneralInputs';
import { initialState, modelReducer } from './ForecastsReducer';



export const Model = () => {
  const [ state, dispatch ] = useReducer(modelReducer, initialState)

  const forecastUpdate = (forecast) => {
   dispatch({type: 'UPDATE_FORECAST', payload: forecast})
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
      <GeneralInputs />
      {Object.keys(state.forecasts).map((el, index) => {
        return <ForecastInputs forecastUpdate={forecastUpdate} key={index} lineItem={el} />
        }
      )}
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}