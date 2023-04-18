import React from 'react'

function ButtonOptions(props) {
  return (
    <td>
          <div className='d-flex justify-content-center align-items-center fs-6'>
            {typeof props.Eliminar !== 'undefined' ?  <i className="fa-solid fa-trash  icon-delete" onClick={()=>props.Eliminar(props.item)}></i> :null}
            {typeof props.Actualizar !== 'undefined' ?   <i className="fa-solid fa-pen-to-square icon-update ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>props.Actualizar(props.item,e.target)} ></i> :null}
            {typeof props.VerDetalle !== 'undefined' ?   <i className="fa-solid fa-up-right-from-square icon-detail ms-2" onClick={()=>{props.VerDetalle(props.item)}}></i> :null}
            {typeof props.Agregar !== 'undefined' ?   <i className="fa-solid fa-square-plus icon-update ms-2"   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(e)=>{props.Agregar(props.item,e)}}></i> :null}
              
              {/**   <i className="fa-solid fa-trash  icon-delete" onClick={()=>props.Eliminar(props.item)}></i>
                <i className="fa-solid fa-pen-to-square icon-update ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>props.Actualizar(props.item,e.target)} ></i>      
                  <i className="fa-solid fa-up-right-from-square icon-detail ms-2" onClick={()=>{props.VerDetalle(props.item)}}></i>
               */}  </div>
    </td>
  )
}

export default ButtonOptions