import React from 'react';
import numeral from 'numeral';

export const EnterpriseValue = ({ BEV, TV }) => {
  const { discountedTV } = TV.values
  const { consolidated, discretePV } = BEV 

  return (
    <div className="w-1/3 mt-6 text-blue-900 self-start">
      <div className="flex justify-between">
        <span className="px-2">PV of Discrete Period Cash Flows: </span>
        <span className="px-2">{numeral(discretePV).format('(0,0)')}</span>
      </div>
      <div className="flex justify-between">
        <span className="px-2">PV of Terminal Value: </span>
        <span className="px-2">{numeral(discountedTV).format('(0,0)')}</span>
      </div>
      <div className="flex justify-between border-blue-900 border-t-4">
        <span className="font-bold p-2">BEV, Controlling Basis: </span>
        <span className="p-2">{numeral(consolidated).format('($0,0)')}</span>
      </div>
    </div>
  )
}