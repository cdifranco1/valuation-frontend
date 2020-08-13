import React, { useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance'
import { VericalSpacer } from '../utils/Spacer'
import Protected from "./Protected"
import DCF from './dcf/DCF';
import WACCBuild from './WACC/WACCBuild';
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom'
import GeneralInputs from './inputs/GeneralInputs';
import ValInputs from './inputs/ValInputs';
import { ModelNav } from './ModelNav'
import ValSummary from './ValSummary'
import { connect } from 'react-redux';
import * as actions from '../actions/updateInputs'


const Model = (props) => {
  const { updateAll } = props
  const { path, url } = useRouteMatch()
  //modelId from url param will either be 'new' or will be id of selected model
  const { modelId } = useParams()
  
  // Model state needs to be fetched from API when selected, unless a new model
  useEffect(() => {
    if (modelId !== 'new') {
      axiosInstance(props.idToken)
        .get(`/api/dcf/${modelId}`)
        .then(res => {
          updateAll(res.data)
        })
    }
  }, [ modelId, updateAll ])

  return (
    <Protected>
      <div className="p-8 flex justify-around">
        <div className="w-4/12">
          
          {/* if the model hasn't been created yet, won't show model navigation and summary */}
            {modelId !== "new" ?
              <>    
                <ModelNav url={url} modelId={modelId} />
                <VericalSpacer /> 
              </>
              :
              null
            }
          <ValSummary />
        </div>

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
          
          <Route path={`${path}/wacc`}>
            <WACCBuild modelId={modelId} />
          </Route>
        </Switch>

      </div>
    </Protected> 
  )
}

const mapStateToProps = (state) => {
  const { forecasts, genInputs: { periods } } = state.dcf
  const { idToken } = state.credentials

  return {
    forecasts,
    periods,
    idToken
  }
}


const { updateAll } = actions

export default connect( mapStateToProps, { updateAll } )( Model )
