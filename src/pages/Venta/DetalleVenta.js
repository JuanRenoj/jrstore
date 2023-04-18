import React, { useEffect, useState } from 'react'
import { ConvertirAMoneda } from '../../utils/Funciones';
import Datos from '../../services/Datos';

function DetalleVenta({producto}) {
    const[detalle, setDetalle] = useState([]);
    const [idprodcuto,setIdproducto]=useState(producto.idfactura)
    useEffect(()=>{
ConsultarDetalle(idprodcuto)
setIdproducto("")
    },[idprodcuto])

    const detalleItem = (data,codigoFac) => {
        let item={
        iddetalle:0,
        idfactura:codigoFac,
        idproducto:data.idproducto,
        cantidad:data.cantidad,
        precio:data.precio,
        total:data.total,
        idstock:data.idstock
        
        }
        
        return item
        }
    const ConsultarDetalle =async (codigo) => {
        let detalles=await Datos.ConsultaDetalleID("detallefactura",codigo)
        if(typeof detalles !== 'undefined'){
            setDetalle(detalles.res)
            return
        }
        setDetalle([])
    }
    const Eliminar = (params) => {
        
    }
  return (
    <div className='table-wrap'>
        <table className='table-item'>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    detalle.length > 0 ?
                    detalle.map((item,index)=>(
                        <tr>
                            <td>{item.descripcion}</td>
                            <td>{item.cantidad+ "  "+item.prefijo}</td>
                            <td>{ConvertirAMoneda(item.precio)}</td>
                            <td>{ConvertirAMoneda(item.total)}</td>
                            <td>
                            <div className='d-flex justify-content-center align-items-center fs-6'>
                            <i className="fa-solid fa-trash  text-danger" onClick={()=>Eliminar(item)}></i>  
                            </div>
                            </td>
                        </tr>
                    ))
                    :
                    null
                }
            </tbody>
        </table>
       
       
    </div>
  )
}

export default DetalleVenta