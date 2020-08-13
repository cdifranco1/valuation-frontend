import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance'
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../actions/updateInputs'

import DeleteAlert from "./mui/AlertDialog"
import Protected from './Protected';



const Dashboard = ({ resetState, idToken, authenticated }) => {
  const [ userModels, setUserModels ] = useState([])
  
  const fetchModels = () =>    
    axiosInstance(idToken)
    .get(`/api/dcf`) 
    .then(res => {
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


  useEffect(() => {
    //fetch DCF models for the user dashboard upon mount
    if (authenticated) {
      fetchModels()
    }
  },[idToken])

  const handleDelete = (id) => {
    //delete specific model then refetch
    axiosInstance(idToken)
      .delete(`/api/dcf/${id}`)
      .then(res => fetchModels())
  }

  return (
    <Protected>
      <div className="p-3 w-4/5 mx-auto bg-white mt-20 shadow-lg">
        <h2 className="text-2xl text-blue-800 font-semibold py-5">Current Projects</h2>
        <div className="flex flex-col">
          <div className="flex border border-blue-900 border-t-2 border-b-4 border-l-0 border-r-0 mb-4">
            <div className="flex p-2 w-full">
              <h2 className="w-1/4 text-xl text-blue-800 font-semibold">Project Name</h2>
              <h2 className="w-1/4 text-xl text-blue-800 font-semibold">Valuation Entity</h2>
              <h2 className="w-1/4 text-xl text-blue-800 font-semibold">Date Created</h2>
              <h2 className="w-1/4 text-xl text-blue-800 font-semibold">Last Updated</h2>
            </div>
            <h2 className="w-1/5"></h2>
          </div>
        {userModels.map(el => {
          return (
            <div key={el._id} className="flex">
              <Link to={`/model/${el._id}/inputs`} className="w-full flex p-2 text-blue-700 hover:bg-blue-700 hover:text-white rounded-md">
                <span className="w-1/4 px-2">{el.projectName}</span>
                <span className="w-1/4 px-2">{el.entityName}</span>
                <span className="w-1/4 px-2">{el.createdAt && moment(el.createdAt).format('lll')}</span>
                <span className="w-1/4 px-2">{el.createdAt && moment(el.updatedAt).format('lll')}</span>
              </Link>
              <DeleteAlert handleDelete={handleDelete} model={el} />
            </div>
          )
        })}
        </div>
        <Link onClick={resetState} to='/model/new/inputs' className="text-xl text-blue-700 font-semibold mt-12 block hover:font-bold">Add New Valuation Project...</Link> 
      </div>
    </Protected>
  )
}

const mapStateToProps = (state) => {
  const { idToken, authenticated } = state.credentials
  return { idToken, authenticated }
}

const { resetState } = actions 

export default connect(mapStateToProps, { resetState })( Dashboard )