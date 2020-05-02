import React, { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { DCF } from './dcf/display/index';
import { ForecastInputContainer } from './dcf/inputs/ForecastInputContainer';
import { CompsList } from './wacc';
import { initialState, inputsReducer } from '../reducers/InputsReducer';

import { template } from '../constants'
import { connect } from 'react-redux';


export const Model = (props) => {
  // const [ inputs, dispatch ] = useReducer(inputsReducer, initialState)
  const [ modelState, setModelState ] = useState(template)

  const updateInputs = (actionType, payload) => {
   dispatch({type: actionType, payload: payload})
  }

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
        updateInputs(actions.updateID, res.data._id)
      })    
  }

  return (
    <div className="p-8">
      <DCF model={modelState} />
      <ForecastInputContainer inputs={inputs} updateInputs={updateInputs} />
      <button type="button" onClick={submitModel}>Calculate DCF</button>
    </div> 
  )
}

const mapStateToProps = state => {
  return {
    userId: state.id,
    forecasts: state.forecasts,
    genInputs: state.GeneralInputs,
    valAssumps: state.valAssumps
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps)(Model)