import React from 'react'

function EstadoVenta({estado}) {

   
  return (
    <>
    {estado ==="Vendido" ?  <span className="activo"> {estado}</span>: <span className="noactivo"> {estado}</span>  }
    </>
  )
}

export default EstadoVenta