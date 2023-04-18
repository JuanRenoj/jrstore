import React from 'react'

function Estado({estado}) {
  return (
    <>
    {estado === "Activo" ?  
    <span className="activo"> {estado}</span>
    :
    <span className="noactivo"> {estado}</span>
    } 
              
    </>
  )
}

export default Estado