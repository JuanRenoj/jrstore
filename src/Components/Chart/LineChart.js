import React from 'react'
import {Chart as ChartJS, } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'



function LineChart({dataUser,options}) {
  return (
    <>
    <div className='w-100 h-100' >
    <Line data={dataUser} options={options}/>
    </div>
    </>
  )
}

export default LineChart