import React, { useReducer, useState } from 'react';
import { axiosBase } from '../utils/utils'
import { DCF } from './DCF/Display/DCF';
import { ForecastInputs } from './DCF/Inputs/ForecastInputs';
import { GeneralInputs } from './DCF/Inputs/GeneralInputs';
import { ValInputs } from './DCF/Inputs/ValInputs';
import { initialState, inputsReducer } from './Reducers/InputsReducer';


import { template } from '../constants'


export const Model = () => {
  const [ inputs, dispatch ] = useReducer(inputsReducer, initialState)
  const [ modelState, setModelState ] = useState(template)

  const updateInputs = (actionType, payload) => {
   dispatch({type: actionType, payload: payload})
  }

  const submitModel = (e) => {
    e.preventDefault()

    axiosBase()
      .post('/api/dcf', inputs)
      .then(res => {
        setModelState(res.data)
      })    
  }

  return (
    <div className="p-8">
      <DCF model={modelState} />
      <GeneralInputs updateInputs={updateInputs} />
      {Object.keys(inputs.forecasts).map((el, index) =>
        <ForecastInputs periods={inputs.genInputs.periods} forecasts={inputs.forecasts} updateInputs={updateInputs} key={index} lineItem={el} />
      )}
      <ValInputs updateInputs={updateInputs} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}