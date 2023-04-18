import React, { useState } from 'react'

function ItemMenu(props) {
    const[openSub,setOpenSub]=useState(false);

  return (
    <div>
        <div className= {props.active ? "op-item op-active" :"op-item"}>
            <div  onClick={()=>props.onClick(props.screen)} className=" w-100">
            <i className={props.icon}></i> 
            <span className='title'>{props.title}</span>
            </div>
            {
                props.detalle ? <i onClick={()=>setOpenSub(!openSub)} className={openSub ?  "fa-solid fa-chevron-up ico" : "fa-solid fa-chevron-down ico" }></i>
                :
                null
            }
           
        </div>

        <ul className={openSub ? "sub-view" : "sub-view sub-close"}>
            {props.children}
        </ul>
    </div>
  )
}

export default ItemMenu