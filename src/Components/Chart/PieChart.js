import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'


function PieChart({dataUser,options}) {
  return (
    <>
    <div className='w-100 ' >
    <Pie data={dataUser} options={options}/>
    </div>
    </>
  )
}

export default PieChart