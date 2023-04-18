import moment from 'moment'
import React from 'react'
import { ConvertirAMoneda } from '../utils/Funciones'
import ButtonOptions from './Buttons/ButtonOptions'
import Estado from './Estado'

function ListeItem(props) {
 //   console.log(item)
  return (
    <div className='row row-item' >
        <div className='col-7 col-md-7 col-sm-7 row-list '>
            <label className='title-label'>Cliente:  {props.item.cliente}</label>
            <label className='date-label'>Fecha:  {moment(props.item.fecha).format("DD/MM/YYYY")}</label>
            <label className='date-label'>Estado:   {props.item.estado}</label>
       
        </div>
        <div className='col-3 col-md-3 col-sm-3 total-label' >
            <label>{ConvertirAMoneda(props.item.total)}</label>
           
            </div>
            <div className='col-2 col-md-2 col-sm-2 status-label'>
            <div >
            <ButtonOptions
            item={props.item}    
            Eliminar={props.Eliminar}
            VerDetalle={props.VerDetalle}
            />
            </div>
        
        </div>
    </div>
  )
}

export default ListeItem