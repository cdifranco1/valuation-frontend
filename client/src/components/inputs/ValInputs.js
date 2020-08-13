import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import * as actions from '../../actions/updateInputs'
import ArrowSvg from "../templateStyles/ArrowSvg"

const useStyles = makeStyles({
  root: {
    marginTop: "2%",
    "& label": {
      fontSize: "1.5rem"
    },
    "& input": {
      padding: "2% 0",
      fontSize: "1.25rem"
    }
  }
})


const ValInputs = (props) => {
  const history = useHistory()
  const classes = useStyles()
  
  const { params: { modelId } } = useRouteMatch()

  const [ valAssumps, setValAssumps] = useState({
    taxRate: '',
    wacc: '',
    ltgr: ''
  })

  useEffect(() => {
    setValAssumps(props.valAssumps)
  }, [props.valAssumps])
  
  const handleChange = (e) => {
    setValAssumps({
      ...valAssumps,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (modelId === 'new'){
      props.updateValAssumps(valAssumps)
      return history.push(`/model/${modelId}/dcf`)
    }

    const modelInputs = {
      ...props.model,
      valAssumps: {
        ...valAssumps
      }
    }
    props.submitModel(modelInputs, modelId, props.idToken)
  }

  return (
    <div className="w-3/5 flex flex-col ml-20" style={{ justifySelf: "center"}}>
      <div className="border bg-gray-300 shadow-lg">
        <h3 className="text-2xl text-white py-3 px-2 bg-blue-700 tracking-wide">
          Valuation Assumptions
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col bg-white px-2">

          <TextField
            className={classes.root} 
            onChange={handleChange}
            value={valAssumps.taxRate}
            id="taxRate"
            name="taxRate"
            type="number"
            label="Tax Rate (%):"
          />
            
          <TextField 
            className={classes.root} 
            onChange={handleChange}
            value={valAssumps.wacc}
            id="wacc"
            name="wacc"
            type="number"
            label="WACC (%):"
          />
    
          <TextField 
            className={classes.root} 
            onChange={handleChange}
            value={valAssumps.ltgr}
            id="ltgr"
            name="ltgr"
            type="number"
            label="Long-Term Growth Rate (%):"
          />  
        </form>
      </div>


      {modelId === "new" ? 
        <div className="flex justify-between">
          <ArrowSvg 
            buttonText="Project Inputs" 
            onClick={() => history.goBack()} 
            direction="left"
          />
          <ArrowSvg 
            buttonText="Forecasts" 
            onClick={handleSubmit} 
            direction="right"
          />
        </div> :
        <button type="button" onClick={handleSubmit} className="p-3 w-full mt-3 bg-white text-blue-800 shadow-md hover:bg-blue-700 hover:text-white text-xl focus:outline-none focus:shadow-outline">Save Assumptions</button>
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  const { valAssumps } = state.dcf
  const { idToken } = state.credentials

  return {
    model: {
      ...state.dcf
    },
    valAssumps,
    idToken
  }
}


const { updateValAssumps, submitModel } = actions


export default connect( mapStateToProps, { updateValAssumps, submitModel } )( ValInputs )
