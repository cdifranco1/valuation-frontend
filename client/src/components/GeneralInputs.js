import React, { useState } from 'react';
import { actions } from '../reducers/InputsReducer'


export const GeneralInputs = (props) => {
  const [ genInputs, setGenInputs] = useState({
    projectName: '',
    entityName: '',
    valDate: '',
    fye: '',
    periods: ''
  })

  const handleChange = (e) => {
    setGenInputs({
      ...genInputs,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    props.updateInputs(actions.updateGenInputs, genInputs)
  }

  return (
    <div className="border border-blue-800 rounded-lg overflow-hidden w-1/3 mx-auto shadow-lg">
      <h3 className="text-3xl font-bold text-white p-4 bg-blue-800 tracking-wide bg-white">Project Inputs</h3>

      <form onSubmit={handleSubmit} className="flex flex-col bg-white">
        <div className="flex flex-row">
          <label htmlFor="projectName" className="w-1/2">Project Name: </label>
          <input 
            type="text" 
            onChange={handleChange} 
            id="projectName" 
            name="projectName" 
            value={genInputs.projectName} 
            className="w-1/2"
          />
        </div>

        <div className="flex flex-row">
          <label className="w-1/2" htmlFor="entityName">Valuation Entity: </label>
          <input 
            type="text" 
            onChange={handleChange} 
            id="entityName" 
            name="entityName" 
            value={genInputs.entityName} 
            className="w-1/2"
          />
        </div>

        <div className="flex flex-row">
          <label className="w-1/2" htmlFor="valDate">Valuation Date: </label>
          <input 
            type="date" 
            onChange={handleChange} 
            id="valDate" 
            name="valDate" 
            value={genInputs.valDate} 
            className="w-1/2"
          />
        </div>
        
        <div className="flex flex-row">
          <label className="w-1/2" htmlFor="fye">Fiscal Year End: </label>
          <input 
            type="date" 
            onChange={handleChange} 
            id="fye" 
            name="fye" 
            value={genInputs.fye} 
            className="w-1/2"
          />
        </div>
        
        <div className="flex flex-row">
          <label className="w-1/2 block" htmlFor="periods">Forecast Periods: </label>
          <input 
            type="number" 
            onChange={handleChange} 
            id="periods" 
            name="periods" 
            value={genInputs.periods} 
            className="w-1/2"
            className="border w-full rounded-lg py-2 bg-gray-300 focus:outline-none focus:shadow-outline focus:bg-white "
          />
        </div>

        <button type="submit" className="">Save Assumptions</button>
      </form>
    </div>
  )
}
