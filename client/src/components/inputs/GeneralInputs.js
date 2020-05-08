import React, { useState, useEffect } from 'react';
import { InputWithLabel } from './InputWithLabel'
import { connect } from 'react-redux'
import * as actions from '../../actions/updateInputs'
import { useRouteMatch, useHistory } from 'react-router-dom';


const GeneralInputs = (props) => {
  const history = useHistory()
  const { path, url, params: { modelId } } = useRouteMatch()
  
  const [ genInputs, setGenInputs] = useState({
    projectName: '',
    entityName: '',
    valDate: '',
    fye: '',
    periods: ''
  })

  useEffect(() => {
    setGenInputs(props.genInputs)
  }, [props.genInputs])

  const handleChange = (e) => {
    setGenInputs({
      ...genInputs,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.updateGenInputs(genInputs)

    console.log(modelId)
    if (modelId === 'new'){
      history.push(`/model/${modelId}/assumptions`)
    }
  }

  return (
    <div className="w-2/3 mx-auto flex flex-col">
      <div className="border bg-gray-300 overflow-hidden shadow-md">
        <h3 className="text-2xl text-white py-3 px-2 bg-blue-700 tracking-wide">
          Project Inputs
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col bg-white">

          <InputWithLabel
            changeHandler={handleChange}
            inputType="text"
            value={genInputs.projectName}
            name="projectName"
            id="projectName"
            labelText="Project Name:"
          />

          <InputWithLabel
            changeHandler={handleChange}
            inputType="text"
            value={genInputs.entityName}
            name="entityName"
            id="entityName"
            labelText="Subject Entity:"
          />

          <InputWithLabel
            changeHandler={handleChange}
            inputType="date"
            value={genInputs.valDate}
            name="valDate"
            id="valDate"
            labelText="Valuation Date:"
          />

          <InputWithLabel
            changeHandler={handleChange}
            inputType="date"
            value={genInputs.fye}
            name="fye"
            id="fye"
            labelText="Fiscal Year End:"
          />  
        
          <InputWithLabel
            changeHandler={handleChange}
            inputType="number"
            value={genInputs.periods}
            name="periods"
            id="periods"
            labelText="Forecast Periods (Years):"
          />    
        </form>
      </div>

      <button type="button" onClick={handleSubmit} className="p-4 w-full mt-3 bg-white text-blue-800 shadow-md focus:outline-none focus:shadow-outline hover:bg-blue-700 hover:text-white text-xl">{modelId === "new" ? "Valuation Assumptions" : "Save Assumptions"}</button>
    </div>
  )
}


const mapStateToProps = (state) => {
  const { genInputs } = state

  // console.log(ownProps)

  return {
    // modelId: ownProps.
    genInputs
  }
}

const { updateGenInputs } = actions

export default connect( mapStateToProps, { updateGenInputs } )( GeneralInputs )