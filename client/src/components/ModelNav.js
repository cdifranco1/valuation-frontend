import React from 'react'
import { NavLink } from 'react-router-dom'
import { VericalSpacer } from '../utils/Spacer'

const inactive = "p-2 text-blue-700 text-xl bg-white hover:bg-blue-600 hover:text-white inline-block w-full"
const active = "bg-blue-600 text-white-important"

export const ModelNav = ({ path, url, modelId }) => {
  return (
    modelId === 'new' ?
    null:
    <div className="flex flex-col w-2/12 mt-2">
      <div className="flex flex-col shadow-md">
        <NavLink className={inactive} activeClassName={active} to={`${url}/inputs`}>Project Inputs</NavLink>
        <NavLink className={inactive} activeClassName={active} to={`${url}/assumptions`}>Valuation Assumptions</NavLink>
        <NavLink className={inactive} activeClassName={active} to={`${url}/dcf`}>Discounted Cash Flow</NavLink>
      </div>
    </div>
  )
}