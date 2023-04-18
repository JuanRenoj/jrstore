import React from 'react'
import { useSelector } from 'react-redux'
const logo = require('../../assets/Img/incial.png')


function Defualt() {
  const{nombre,apellido} =useSelector(state=>state.user)
  return (
    <>
<div className='d-flex justify-content-center align-items-center vh-100'>
    <div className='w-75 h-75  row'>
    <div className='col-12 d-flex  justify-content-center align-items-center'>
        <h4>BIENVENIDO</h4>   
    </div >
    <div className='col-12 d-flex  justify-content-center align-items-center'>      
        <h4>{nombre} {apellido}</h4>
       
    </div >
    <div className='col-12 d-flex justify-content-center align-items-center ' >
      <img src={logo} alt="logo" height={350} width={600} />
    </div>
    <div className='col-12 d-flex justify-content-center align-items-center'>
        <p>Seleccione una opción en el  menu del lado  izquierdo</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default Defualt