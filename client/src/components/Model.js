import React, { useState, useReducer, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { DCF } from './dcf/index';
import { ForecastInputContainer } from './inputs/ForecastInputContainer';
import { initialState, dcfReducer, actions } from '../reducers/InputsReducer';
import { Route, Link, Switch, useRouteMatch, useParams } from 'react-router-dom'

import { template } from '../constants'
import { GeneralInputs } from './inputs/GeneralInputs';
import { ValInputs } from './inputs/ValInputs';
import { updateLocale } from 'moment';


export const Model = (props) => {
  const [ dcfInputs, dispatch ] = useReducer(dcfReducer, initialState)
  // const [ modelState, setModelState ] = useState(template)
  const { path, url } = useRouteMatch()
  const { modelId } = useParams()

  const updateInputs = (action, payload) => {
    const actionObj = {type: action, payload: payload}
    dispatch(actionObj)
  }

  // when submitting the model, will want to submit to a separate reducer
  const submitModel = (e) => {
    console.log(dcfInputs)
    e.preventDefault()

    if (modelId === "new"){
      return  axiosInstance()
                .post('/api/dcf', dcfInputs)
                .then(res => {
                  updateInputs(actions.updateAll, res.data)
                })    
    }

    axiosInstance()
      .put(`/api/dcf/${modelId}`, dcfInputs)
      .then(res => {
        console.log(res)
        updateInputs(actions.updateAll, res.data)
      })    
  }
  
  // will become necessary once list of models is implemented
  useEffect(() => {
    if (modelId !== 'new') {
      axiosInstance()
        .get(`/api/dcf/${modelId}`)
        .then(res => {
          console.log(res)
          updateInputs(actions.updateAll, res.data)
          // need to set the inputs -- restructuring dcf model to separate calculations and inputs
        })
    }
  }, [])

  return (
    <div className="p-8">
      <Switch>
        <Route path={`${path}/dcf`}>
          <DCF model={dcfInputs} submitModel={submitModel} />
          <ForecastInputContainer inputs={dcfInputs} updateInputs={updateInputs} />
          <Link to={`${url}/inputs`}>Go to Inputs</Link>
        </Route>
        <Route path={`${path}/inputs`}>
          <GeneralInputs inputs={dcfInputs} updateInputs={updateInputs} />
          <ValInputs inputs={dcfInputs} updateInputs={updateInputs} />
          <Link to={`${url}/dcf`}>Go to DCF</Link>
        </Route>
        <Route exact path={`${path}`}>
          <Link to={`${url}/dcf`}>Go to DCF</Link>
          <Link to={`${url}/inputs`}>Go to Inputs</Link>
        </Route>
      </Switch>
    </div> 
  )
}