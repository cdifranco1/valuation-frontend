import React from 'react';
import { NavLink } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div>
      <div>
        <h2>Current Valution Projects</h2>

        {/* Will need to store the user models and return a list. Need to work on data schema. */}
        {models.map(el => 
          <Link to={`/model/${userId}/${el.modelId}`}>{el.name}</Link>
        )}
      </div>
      <Link>Add New Valuation Model...</Link> 
    </div>
  )
}