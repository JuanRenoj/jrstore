import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'


function BarChart({dataUser,options}) {
  return (
    <>
    <div className='w-100 ' >
    <Bar data={dataUser} options={options}/>
    </div>
    </>
  )
}

export default BarChart