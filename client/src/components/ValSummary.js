import React from "react";
import { connect } from "react-redux"
import moment from "moment"
import numeral from "numeral"


const ValSummary = ({ projectInputs, assumptions, values }) => {
    
  const displayItem = (title, value, key) => {
    return (
      <div key={key} className="w-full flex justify-between items-center text-blue-900 px-4 text-sm">
          <p className="w-1/2">{`${title}:`}</p>
          <p className="w-1/2 text-center">{value}</p>
      </div>
    )
  }
  
  return (
    <div className="bg-white shadow-md">
      <h2 className="p-2 pb-1 text-white bg-blue-700 inline-block w-full tracking-wide">Valuation Summary </h2>

      <div className="mt-4">
        <h3 className="pt-2 pb-1 px-2 border-b-4 border-gray-400 mb-2 font-bold text-blue-900 tracking-wide">Project Inputs</h3>
        {Object.keys(projectInputs).map((el, i) => {
          return displayItem(projectInputs[el].title, projectInputs[el].value, `${el}-${i}`)
        })}
      </div>

      <div className="mt-4">
        <h3 className="pt-2 pb-1 px-2 border-b-4 border-gray-400 mb-2 font-bold text-blue-900 tracking-wide">Assumptions</h3>
        {Object.keys(assumptions).map((el, i) => {
          return displayItem(assumptions[el].title, assumptions[el].value, `${el}-${i}`)
        })}
      </div>

      <div className="mt-4 mb-4">
        <h3 className="pt-2 pb-1 px-2 border-b-4 border-gray-400 mb-2 font-bold text-blue-900 tracking-wide">Value Indications</h3>
        {Object.keys(values).map((el, i) => {
          return displayItem(values[el].title, values[el].value, `${el}-${i}`)
        })}
      </div>
      

    </div>
  )
}



const mapStateToProps = (state) => {
  const BEV = state.dcf.BEV.consolidated
  const TV = state.dcf.TV.values.discountedTV
  const { projectName, entityName, periods, valDate, fye } = state.dcf.genInputs
  const { wacc, taxRate, ltgr } = state.dcf.valAssumps 

  return {
    projectInputs: {
      projectName: {
        title: "Project Name",
        value: projectName
      },
      entityName: {
        title: "Entity Name",
        value: entityName
      },
      periods: {
        title: "Forecast Periods",
        value:`${periods} years`
      },
      valDate: {
        title: "Valuation Date",
        value: moment(valDate).format('LL')
      },
      fye: {
        title: "Fiscal Year End",
        value: moment(fye).format('LL')
      }
    },
    assumptions: {
      wacc: {
        title: "Weighted Average Cost of Capital (WACC)",
        value: numeral(wacc / 100).format('0.0%'),
      },
      taxRate: {
        title: "Tax Rate",
        value: numeral(taxRate / 100).format('0.0%'),
      },
      ltgr: {
        title: "Long Term Growth Rate",
        value: numeral(ltgr / 100).format('0.0%')
      }
    },
    values: {
      BEV: {
        title: "Business Enterprise Value",
        value: numeral(BEV).format("$0,0.0")
      },
      TV: {
        title: "Terminal Value",
        value: numeral(TV).format("$0,0.0")
      }
    }
  }
}

export default connect( mapStateToProps )( ValSummary )


