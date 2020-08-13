import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import * as actions from '../../actions/updateInputs'
import { useRouteMatch, useHistory } from 'react-router-dom';
import ArrowSvg from '../templateStyles/ArrowSvg.js'


const useStyles = makeStyles({
  root: {
    marginTop: "2%",
    "& label": {
      fontSize: "1.15rem"
    },
    "& input": {
      padding: "2% 0",
      fontSize: "1.15rem"
    }
  }
})


const GeneralInputs = (props) => {
  const classes = useStyles()

  const history = useHistory()
  const { params: { modelId } } = useRouteMatch()
  
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
    
    if (modelId === 'new'){
      props.updateGenInputs(genInputs)
      console.log("Running genInput update")
      return history.push(`/model/${modelId}/assumptions`)
    }

    const model = {
      ...props.model,
      genInputs: {
        ...genInputs
      }
    }

    console.log("Submitting model")
    console.log(model)
    props.submitModel(model, modelId, props.idToken)
  }

  return (
    <div className="w-3/5 flex flex-col ml-20">
      <div className="border bg-gray-300 shadow-md">
        <h3 className="text-2xl text-white py-3 px-2 bg-blue-700 tracking-wide">
          Project Inputs
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col bg-white px-2">

          <TextField
            className={classes.root}
            label="Project Name" 
            type="text" 
            onChange={handleChange} 
            id="projectName" 
            name="projectName" 
            value={genInputs.projectName} 
          />
          
          <TextField
            className={classes.root}
            label="Subject Entity" 
            type="text" 
            onChange={handleChange} 
            id="entityName" 
            name="entityName" 
            value={genInputs.entityName} 
          />
          
          <TextField
            className={classes.root}
            label="Valuation Date" 
            type="date" 
            onChange={handleChange} 
            id="valDate" 
            name="valDate" 
            value={genInputs.valDate} 
            InputLabelProps={{
              shrink: true,
            }}
          />
         
          <TextField
            className={classes.root}
            label="Fiscal Year End" 
            type="date" 
            onChange={handleChange} 
            id="fye" 
            name="fye" 
            value={genInputs.fye}
            InputLabelProps={{
              shrink: true,
            }}
          />
          
          <TextField
            className={classes.root}
            label="Forecast Periods (Years)" 
            type="number" 
            onChange={handleChange} 
            id="periods" 
            name="periods" 
            value={genInputs.periods} 
          />
        
        </form>
      </div>

    {modelId === "new" ?
      <div className="flex justify-end">
        <ArrowSvg buttonText="Valuation Assumptions" onClick={handleSubmit} direction="right" />
      </div> 
        :
      <button type="button" onClick={handleSubmit} className="p-3 w-full mt-3 bg-white text-blue-800 hover:bg-blue-700 hover:text-white text-xl focus:outline-none focus:shadow-outline">Save Assumptions</button>}
    </div>
  )
}


const mapStateToProps = (state) => {
  const { genInputs, forecasts } = state.dcf
  const { idToken } = state.credentials

  return {
    model: {
      ...state.dcf
    },
    forecasts,
    genInputs,
    idToken
  }
}

const { updateGenInputs, submitModel } = actions

export default connect( mapStateToProps, { updateGenInputs, submitModel } )( GeneralInputs )