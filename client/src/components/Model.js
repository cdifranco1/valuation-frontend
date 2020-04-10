import React, { useState } from 'react';


const model = () => {
  const [ allForecasts, setAllForecasts ] = useState({
      revenues: [1000, 1200, 1300, 1400,1500],
      cogs: [400, 500, 600, 700, 800],
      opex: [200, 250, 300, 400, 450],
      wc: [20, 25, 30, 35, 40],
      capex: [30, 40, 45, 60, 70]
  })


  return (
    <div></div>
  )
}