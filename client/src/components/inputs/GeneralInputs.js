import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import * as actions from '../../actions/updateInputs'
import { useRouteMatch, useHistory } from 'react-router-dom';



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



const GeneralInputs = (props) => {
  const classes = useStyles()

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

    if (modelId === 'new'){
      history.push(`/model/${modelId}/assumptions`)
    }
  }

  return (
    <div className="w-2/3 mx-auto flex flex-col">
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
            defaultValue={genInputs.valDate} 
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
            defaultValue={genInputs.valDate}  
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

      <div className="flex justify-end">
        <button type="button" onClick={handleSubmit} className="mt-8 flex justify-between items-center p-4 w-5/12 mt-3 bg-white text-blue-800 shadow-md focus:outline-none focus:shadow-outline hover:bg-blue-700 arrow-fill hover:text-white text-2xl">{modelId === "new" ? "Valuation Assumptions" : "Save Assumptions"}
          <svg className="h-10 w-10 fill-current text-blue-700 hover:fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
          </svg>
        </button>
      </div>

    </div>
  )
}


const mapStateToProps = (state) => {
  const { genInputs } = state

  return {
    genInputs
  }
}

const { updateGenInputs } = actions

export default connect( mapStateToProps, { updateGenInputs } )( GeneralInputs )