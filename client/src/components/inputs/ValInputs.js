import React, { useState, useEffect } from 'react';
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputWithLabel } from './InputWithLabel'
import { connect } from 'react-redux'
import * as actions from '../../actions/updateInputs'


const useStyles = makeStyles({
  root: {
    marginTop: "2%",
    "& label": {
      fontSize: "1.5rem"
    },
    "& input": {
      padding: "2% 0",
      fontSize: "1.5rem"
    }
  }
})


const ValInputs = (props) => {
  const history = useHistory()
  console.log(history)
  const location = useLocation()
  const classes = useStyles()
  
  const { path, url, params: { modelId } } = useRouteMatch()

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

    props.updateValAssumps(valAssumps)

    if (modelId === 'new'){
      history.push(`/model/${modelId}/dcf`)
    }
  }

  return (
    <div className="w-2/3 mx-auto flex flex-col">
      <div className="border bg-gray-300 shadow-md">
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
          <button type="button" onClick={() => history.goBack()} className="mt-8 flex justify-between items-center p-4 w-5/12 mt-3 bg-white text-blue-800 shadow-md focus:outline-none focus:shadow-outline hover:bg-blue-700 arrow-fill hover:text-white text-2xl">
            <svg className="h-10 w-10 fill-current text-blue-700 hover:fill-current transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
            </svg>
            Project Inputs
          </button>
          <button type="button" onClick={handleSubmit} className="mt-8 flex justify-between items-center p-4 w-5/12 mt-3 bg-white text-blue-800 shadow-md focus:outline-none focus:shadow-outline hover:bg-blue-700 arrow-fill hover:text-white text-2xl">
            Forecasts
            <svg className="h-10 w-10 fill-current text-blue-700 hover:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
            </svg>
          </button>
        </div> :
        <button type="button" onClick={handleSubmit} className="p-4 w-full mt-3 bg-white text-blue-800 hover:bg-blue-700 hover:text-white text-xl">Save Assumptions</button>
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  const { valAssumps } = state

  return {
    valAssumps
  }
}


const { updateValAssumps } = actions


export default connect( mapStateToProps, { updateValAssumps } )( ValInputs )
