import React, { useReducer, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { Spacer, HorizontalSpacer } from '../utils/Spacer'
import DCF from './dcf/DCF';
import ForecastInputContainer from './inputs/ForecastInputContainer';
import { Route, Link, Switch, useRouteMatch, useParams } from 'react-router-dom'
import GeneralInputs from './inputs/GeneralInputs';
import ValInputs from './inputs/ValInputs';
import { ModelNav } from './ModelNav'
import { connect } from 'react-redux';
import * as actions from '../actions/updateInputs'


const Model = (props) => {
  const { path, url } = useRouteMatch()
  //modelId from url param will either be 'new' or will be id of selected model
  const { modelId } = useParams()
  
  // Model state needs to be fetched from API when selected, unless a new model
  useEffect(() => {
    if (modelId !== 'new') {
      axiosInstance()
        .get(`/api/dcf/${modelId}`)
        .then(res => {
          console.log(res)
          props.updateAll(res.data)
        })
    }
  }, [ modelId ])

  return (
    <div className="p-8 flex">


      <Switch>
        <Route exact path={`${path}/inputs`}>
          <GeneralInputs />
        </Route>

        <Route path={`${path}/assumptions`}>
          <ValInputs />
        </Route>

        <Route path={`${path}/dcf`}>
          <DCF modelId={modelId} />
        </Route>
      </Switch>

      <HorizontalSpacer />
      <ModelNav url={url} modelId={modelId} />
    </div> 
  )
}

const mapStateToProps = (state) => {
  const { forecasts, genInputs: { periods } } = state
  console.log(state)

  return {
    forecasts,
    periods
  }
}


const { updateAll } = actions

export default connect( mapStateToProps, { updateAll } )( Model )
