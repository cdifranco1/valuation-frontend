import React, { useReducer, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { DCF } from './dcf/DCF';
import { ForecastInputContainer } from './inputs/ForecastInputContainer';
import { initialState, dcfReducer, actions } from '../reducers/inputsReducer';
import { Route, Link, Switch, useRouteMatch, useParams } from 'react-router-dom'
import { GeneralInputs } from './inputs/GeneralInputs';
import { ValInputs } from './inputs/ValInputs';


export const Model = () => {
  const [ dcfInputs, dispatch ] = useReducer(dcfReducer, initialState)
  const { path, url } = useRouteMatch()

  //modelId from url param will either be 'new' or will be id of selected model
  const { modelId } = useParams()

  const updateInputs = (action, payload) => {
    const actionObj = {type: action, payload: payload}
    dispatch(actionObj)
  }

  // calculate the DCF either as an update to existing model or for new model
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
  
  // fetches the model with the specific ID selected and updates model state through reducer
  useEffect(() => {
    if (modelId !== 'new') {
      axiosInstance()
        .get(`/api/dcf/${modelId}`)
        .then(res => {
          console.log(res)
          updateInputs(actions.updateAll, res.data)
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