import React from 'react';
import numeral from 'numeral';

export const EnterpriseValue = ({ BEV }) => {
  const { consolidated } = BEV 

  return (
    <div className="w-1/2 self-end py-10">
      <span className="text-2xl font-bold px-4">BEV, Controlling Basis: </span>
      <span className="text-2xl">{numeral(consolidated).format('($0,0)')}</span>
    </div>
  )
}