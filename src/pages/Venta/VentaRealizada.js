import moment from 'moment';
import React, { useEffect, useState } from 'react'
import EstadoVenta from '../../Components/EstadoVenta';
import { ConvertirAMoneda } from '../../utils/Funciones';
import Datos from '../../services/Datos';

import InputSearch from '../../Components/InputSearch';
import swal from 'sweetalert';
import ListeItem from '../../Components/ListeItem';
import Loader from '../../Components/Loader'
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';

function VentaRealizada() {
    const [ventas,setVentas]=useState([]);
    const [ventasaux,setVentasaux]=useState([]);
   const [buscar,setBuscar]=useState("");

    const [productoSelected, setProductoSelected]=useState([])
    const [verDetalle,setVerDetalle]=useState(false);
    const[detalle, setDetalle] = useState([]);
    const [idprodcuto,setIdproducto]=useState()
    
useEffect(()=>{
ConsultarVenta();
},[])

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
const ConsultarVenta =async () => {
    let ventas=await Datos.Consulta("Factura");
    if(typeof ventas !== 'undefined'){
        setVentas(ventas.res)
        setVentasaux(ventas.res)
        return
    }
    setVentas([])
}

const ConsultarDetalle =async (item) => {

    setProductoSelected(item)
    let detalles=await Datos.ConsultaDetalleID("detallefactura",item.idfactura)
    console.log(detalles)
    if(typeof detalles !== 'undefined'){
        setDetalle(detalles.res)
        return
    }
    setDetalle([])
}
const Eliminar = async(item) => {
    swal({
        title:"Esta seguro de eliminar este producto",
        text:"Una vez eliminado no se podra restablecer",
        buttons:true,
        dangerMode:true
    }).then((yes)=>{
        if(yes){
            EliminarRegistro(item)
        }
    })
   
}

const EliminarRegistro =async (item) => {
    let eliminar=await Datos.BorrarReg("detallefactura",item.iddetalle)
    if(typeof eliminar !== 'undefined'){
        swal("Producto","Se elimino de forma correcta","success")
    await   ConsultarDetalle(productoSelected)
        return
    } 
}
const Busqueda = (text) => {
  
    setBuscar(text)
    setVentas(ventasaux.filter((item)=>{
      return   item.cliente.toLowerCase().includes(text.toLowerCase())
    }).map((Element)=>{
        return Element
    })
    )
    
    
}
const EliminarFactura = async(params) => {
    swal({
        title:"Aviso",
        text:"Esta seguro de elimnar este registro",
        buttons:true,
        dangerMode:true,
    }).then((yes)=>{
        if(yes){
            EliminarVenta(params)
        }
    })
   
}
const EliminarVenta = async(venta) => {
    let borar= await Datos.BorrarReg("factura",venta.idfactura);
    if(typeof borar !== 'undefined'){
        swal("Aviso","El registro se elimino correctamente","success")
        setDetalle([])
        await ConsultarVenta()
        return
    }
    swal("Aviso","No se pudo elimnar el registro","error")
}

  return (
    <>
    <div className='row h-100'>
        <div className='col-sm-6 col-md-6 col-lg-6'>
        
            <div className='div-header'>
            <label className='title-orden mt-3'> Ventas Realizadas</label>
            <div className='row mt-3'>
                <InputSearch
                    onChange={Busqueda} 
                    value={buscar} 
                    placeholder="Buscar Detalle..."  
                />
            </div></div>
            <div className='div-body'>
              
                   { ventas.length > 0 ? 
                   <ContainTable>
                   <HeaderTable>
                   <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>  
                                <th>Estado</th>  
                                <th>Opciones</th>    

                   </HeaderTable>
                   <BodyTable>

              { ventas.map((item,index)=>(
                    <tr
                    key={index}>
                    <td>{item.cliente}</td>
                    <td>{moment(item.fecha).format("DD/MM/YYYY") }</td>
                    <td>{ConvertirAMoneda( item.total)}</td>
                    <td><EstadoVenta estado={item.estado}/></td>
                    <ButtonOptions item={item} Eliminar={EliminarFactura} VerDetalle={ConsultarDetalle}/>                   
                    </tr>
                )) 
           } 
           </BodyTable>
           </ContainTable>
                :
                <Loader />
        }  
         
            </div>

        </div>
        <div className='col-sm-6 col-md-6 col-lg-6 '>
            <div className='div-header'>
            <div className='row mt-3'>
            <h6>Producto de la venta</h6>
          </div>
          <div className='mt-3'>
            <p>Haga clic en el icono <i className="fa-solid fa-up-right-from-square icon-detail ms-2"  ></i>    para ver los productos de la factura</p>
            </div>
            </div>
            <div  className='div-body'>
          
   
                {
                    detalle.length > 0 ?
                    <ContainTable>
                        <HeaderTable>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th>Acción</th>
                        </HeaderTable>
                        <BodyTable>
                            {
                             detalle.map((item,index)=>(
                                <tr key={index}> 
                                    <td>{item.descripcion}</td>
                                    <td>{item.cantidad+ "  "+item.prefijo}</td>
                                    <td>{ConvertirAMoneda(item.precio)}</td>
                                    <td>{ConvertirAMoneda(item.total)}</td>
                                    <td><ButtonOptions item Eliminar={Eliminar}/></td>
                             
                                   
                                </tr>
                            ))
                            }
                        </BodyTable>
                    </ContainTable>
                   
                    :
                   <div>
                   
                      
                   </div>
                }
        
        </div>
        </div>
    </div>
    </>
  )
}

export default VentaRealizada