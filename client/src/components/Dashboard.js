import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance'


export const Dashboard = () => {
  // get list of valuations, store in state
  // create mapping of links to routes for model 
  const [ userModels, setUserModels ] = useState([]) 

  useEffect(() => {
    axiosInstance()
      .get(`/api/dcf`) //backend will check the token to get the user's id
      .then(res => {
        console.log(res)
        setUserModels(res.data.map(el => {
          const { genInputs: { projectName } } = el
          const { genInputs: { entityName } } = el
          return {
            modelId: el._id,
            projectName: projectName,
            entityName: entityName
          }
        }))
      })
  },[])

  return (
    <div>
      <div>
        <h2>Current Valution Projects</h2>
        {userModels.map(el => {
          return <Link to={`/model/${el.modelId}`}>{el.projectName}</Link>
        }
        )}
      </div>
      <Link to='/model/new'>Add New Valuation Model...</Link> 
    </div>
  )
}