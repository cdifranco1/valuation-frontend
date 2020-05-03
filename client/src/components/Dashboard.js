import React, { useState, useReducer } from 'react';
import { GeneralInputs } from './inputs/GeneralInputs'
import { ValInputs } from './inputs/ValInputs';
import { Link, Route } from 'react-router-dom';
import { Model } from './Model'
import { initialState, inputsReducer, actions } from '../reducers/InputsReducer';
import axiosInstance from '../utils/axiosInstance'


export const Dashboard = () => {
  // get list of valuations, store in state
  // create mapping of links to routes for model 
  const [ inputs, dispatch ] = useReducer(inputsReducer, initialState)
  const [ userModels, setUserModels ] = useState([])

  const updateInputs = (actionType, payload) => {
    dispatch({type: actionType, payload: payload})
   }
 

  // useEffect(() => 
  //   axiosInstance()
  //     .get(`/dcfs`) //backend will check the token to get the user's id
  //     .then(res => {
  //       setUserModels(res.data.map(el => el.id))
  // }), [])

  return (
    <div>
      <div>
        <h2>Current Valution Projects</h2>
        {userModels.map(el => 
          <Link to={`/model/${el.id}`}>{el.name}</Link>
        )}
      </div>
      <Route path='/model'>
          <Model updateInputs={updateInputs} />
      </Route>
      <Link to='/model/inputs'>Add New Valuation Model...</Link> 
    </div>
  )
}