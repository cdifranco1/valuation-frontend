import React, { useState, useReducer } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { DCF } from './dcf/index';
import { ForecastInputContainer } from './inputs/ForecastInputContainer';
import { initialState, inputsReducer, actions } from '../reducers/InputsReducer';

import { template } from '../constants'


export const Model = (props) => {
  const [ inputs, dispatch ] = useReducer(inputsReducer, initialState)
  const [ modelState, setModelState ] = useState(template)

  // when submitting the model, will want to submit to a separate reducer
  const submitModel = (e) => {
    e.preventDefault()

    if (inputs.id.length){
      return axiosInstance()
              .put(`/api/dcf/${inputs.id}`, inputs)
              .then(res => {
                setModelState(res.data)
              })    
    }

    axiosInstance()
      .post('/api/dcf', inputs)
      .then(res => {
        setModelState(res.data)
        props.updateInputs(actions.updateID, res.data._id)
      })    
  }

  return (
    <div className="p-8">
      <DCF model={modelState} />
      <ForecastInputContainer inputs={inputs} updateInputs={props.updateInputs} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}