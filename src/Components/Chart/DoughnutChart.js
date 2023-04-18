import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'


function DoughnutChart({dataUser,options}) {
  return (
    <>
 
    <Doughnut data={dataUser} options={options}/>
  
    </>
  )
}

export default DoughnutChart;
