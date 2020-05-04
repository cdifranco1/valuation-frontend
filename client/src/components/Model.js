import React, { useState, useReducer, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { DCF } from './dcf/index';
import { ForecastInputContainer } from './inputs/ForecastInputContainer';
import { initialState, inputsReducer, actions } from '../reducers/InputsReducer';
import { Route, Link, Switch, useRouteMatch, useParams } from 'react-router-dom'

import { template } from '../constants'
import { GeneralInputs } from './inputs/GeneralInputs';
import { ValInputs } from './inputs/ValInputs';


export const Model = (props) => {
  const [ inputs, dispatch ] = useReducer(inputsReducer, initialState)
  const [ modelState, setModelState ] = useState(template)
  const { path, url } = useRouteMatch()
  const { modelId } = useParams()

  const updateInputs = (action, payload) => {
    const actionObj = {type: action, payload: payload}
    dispatch(actionObj)
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

  // will become necessary once list of models is implemented
  useEffect(() => {
    console.log(path)
    console.log(url)
    console.log(modelId)
    if (modelId === 'new') return null
    
    axiosInstance()
      .get(`/api/dcf/${modelId}`)
      .then(res => {
        console.log(res)
        setModelState(res.data)
        // need to set the inputs -- restructuring dcf model to separate calculations and inputs
      })
  }, [])

  return (
    <div className="p-8">
      <Switch>
        <Route path={`${path}/dcf`}>
          <DCF model={modelState} submitModel={submitModel} />
          <ForecastInputContainer inputs={inputs} updateInputs={updateInputs} />
          <Link to={`${url}/inputs`}>Go to Inputs</Link>
        </Route>
        <Route path={`${path}/inputs`}>
          <GeneralInputs inputs={inputs} updateInputs={updateInputs} />
          <ValInputs inputs={inputs} updateInputs={updateInputs} />
          <Link to={`${path}/dcf`}>Go to DCF</Link>
        </Route>
        <Route exact path={`${path}`}>
          <Link to={`${url}/dcf`}>Go to DCF</Link>
          <Link to={`${url}/inputs`}>Go to Inputs</Link>
        </Route>
      </Switch>
    </div> 
  )
}