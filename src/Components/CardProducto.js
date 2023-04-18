import React from 'react'

function CardProducto(props) {
  return (
  
    <div className='div-card-pro' onClick={()=>props.onClick(props.Item,props.Cantidad)}>
        <div className='div-img-pro'>
        <img className='img-pro' src={props.Url} alt='imgpro'></img>
        </div>
        <div className='div-desc-pro'>
            <span className='title-pro'>{props.Title}</span>
            <span className='desc-pre'>{props.Precio}</span>
            <span className='desc-pro'>{props.Disponible}</span>
        </div>
    </div>
   
  )
}

export default CardProducto