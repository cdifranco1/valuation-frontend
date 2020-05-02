import React, { useState, useEffect } from 'react';
import { GeneralInputs } from './GeneralInputs'
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'


export const Dashboard = () => {
  // get list of valuations, store in state
  // create mapping of links to routes for model 
  const [ userModels, setUserModels ] = useState([])

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
          <Link to={`/model/${el.modelId}`}>{el.name}</Link>
        )}
      </div>
      <Link to='/model/inputs'>Add New Valuation Model...</Link> 
    </div>
  )
}