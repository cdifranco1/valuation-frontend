import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance'
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../actions/updateInputs'


const Dashboard = ({ resetState }) => {
  const [ userModels, setUserModels ] = useState([]) 

  useEffect(() => {
    axiosInstance()
      .get(`/api/dcf`) //backend will check the token to get the user's id
      .then(res => {
        console.log(res)
        setUserModels(res.data.map(el => {
          const { genInputs: { projectName, entityName } } = el
          const { createdAt, updatedAt, _id } = el
          return {
            _id,
            projectName,
            entityName,
            updatedAt,
            createdAt
          }
        }))
      })
  },[])

  return (
    <div className="p-3 w-4/5 mx-auto bg-white mt-20 shadow-lg">
      <h2 className="text-4xl text-blue-800 font-semibold py-5">Current Projects</h2>
      <div className="flex flex-col">
        <div className="flex p-2 w-full border border-blue-900 border-t-2 border-b-4 border-l-0 border-r-0 mb-4">
          <h2 className="w-1/2 text-2xl text-blue-800 font-semibold">Project Name</h2>
          <h2 className="w-1/2 text-2xl text-blue-800 font-semibold">Valuation Entity</h2>
          <h2 className="w-1/2 text-2xl text-blue-800 font-semibold">Date Created</h2>
          <h2 className="w-1/2 text-2xl text-blue-800 font-semibold">Last Updated</h2>
        </div>
      {userModels.map(el => {
        return (
          <div key={el._id}>
            <Link to={`/model/${el._id}/inputs`} className="w-full flex p-2 text-blue-700 hover:bg-blue-700 hover:text-white rounded-md">
              <span className="w-1/2 block text-xl">{el.projectName}</span>
              <span className="w-1/2 block text-xl">{el.entityName}</span>
              <span className="w-1/2 block text-xl">{el.createdAt && moment(el.createdAt).format('lll')}</span>
              <span className="w-1/2 block text-xl ">{el.createdAt && moment(el.updatedAt).format('lll')}</span>
            </Link>
          </div>
        )
      })}
      </div>
      <Link onClick={resetState} to='/model/new/inputs' className="text-2xl text-blue-700 font-semibold mt-12 block hover:font-bold">Add New Valuation Project...</Link> 
    </div>
  )
}

const { resetState } = actions 

export default connect(null, { resetState })( Dashboard )