import React, {useContext, useEffect, useState}from 'react'

import Datos from '../../services/Datos';
import { ItemProducto } from '../../Context/Context';
import swal from "sweetalert";
import { Cantidad, CantidadUnit } from '../../utils/Funciones';
import moment from 'moment/moment';
import InputSearch from '../../Components/InputSearch';
import ContainTable from '../../Components/Table/ContainTable';
import Loader from '../../Components/Loader';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import IconSort from '../../Components/Buttons/IconSort';
import printJS from 'print-js';
function Inventario() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idstock, setIdStock] = useState("");
    const [idproducto, setIdProducto] = useState("");   
    const [nombre, setNombre] = useState("");
     const [factor, setFactor] = useState("");   
   const [proRegistrado,setProRegistrado] =useState([]);
    const [accion, setAccion] = useState("new");
   const [estado, setEstado] = useState("");

    const [sort, setSort]=useState("ASC")
 
 
    
  
useEffect(()=>{
 ProductoRegistrado();
ConsultaInventario();
setIdProducto(3);

},[])

const ProductoRegistrado = async() => {
  let pro=await Datos.Consulta("producto/registrado");
  if(typeof pro !== 'undefined'){
    setProRegistrado(pro.res)
    return
  }
  setProRegistrado([])
  
}

    const ConsultaInventario=async()=>{
        const datosDM=await Datos.Consulta("producto/inventario");
        console.log(datosDM)
        if(typeof datosDM !== 'undefined'){
           console.log(datosDM.res);
          setDatos(datosDM.res);
          setDatosAux(datosDM.res)   
          return          
        }

        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdStock(0);        
       // setIdProducto("");
     
        setNombre("");
        setFactor("");     
    
        setAccion("new");
      }
      const returnDatos = (codigo) => { 
      
        return { idstock:codigo,
            idproducto:idproducto,
           nombre:nombre,
            factor:factor
        }
       }
      const Ingresar=async()=>{   
        let datosss=await Datos.NuevoReg("stock",returnDatos(0));
        if(typeof datosss !== 'undefined'){
      swal("Detalle Producto","Ingresado exitosamente","success");
           limpiar();
            ConsultaInventario();
          }
      }
      const Actualizar=async()=>{  
        let datosss=await Datos.ActualizarReg("stock",returnDatos(idstock));
        if(typeof datosss !== 'undefined'){    
            swal("Detalle Producto","Actualizado exitosamente","success");
            ConsultaInventario();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let datoss=await Datos.BorrarReg("stock",datos.idstock);
        if(typeof datoss!=="undefined"){
            swal("Detalle Producto", "Eliminado con exíto","success")         
            ConsultaInventario();
        }
      }
      const GuardarCambios=(e)=>{
        e.preventDefault();
        if(accion==="new"){
          Ingresar();
        }else{
          Actualizar();
        }
      }
      const AbrirActualizar=(datos,e)=>{
  setIdStock(datos.idstock);
  setIdProducto(datos.idproducto);
  setNombre(datos.nombre);
 
  setFactor(datos.factor);
 
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{
       
        setBuscar(text);
        
        setDatos(datosAux.filter((item)=>{
            return   item.descripcion.toLowerCase().includes(text.toLowerCase()) ;   
          }).map((element)=>{
            return element
          })
         );
        
          }
          const AbrirIngreso=(e)=>{
            let myInput = document.getElementById("exampleModal");
            e.target.addEventListener("shown.bs.modal", function () {
              myInput.focus();
            });
          }

        const sortItem = (col) => {          
          if(sort ==="ASC"){
            setDatos(datosAux.sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
          setSort("DESC")
            return
          }
        setDatos(datosAux.sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 ));
        setSort("ASC")
        return
          
         }

  return (
    <>
    <div className='div-header'>
      <label className='title-orden'>Producto Registrado:</label>
   <div className='row'>
   <div className='col-sm-3 col-md-3 col-lg-3  div-info'>
    <label className='desc-div-info'>{proRegistrado.cantidad}</label>
        <label className='title-div-info'>Registrado</label>
</div>
<div className='col-sm-3 col-md-3 col-lg-3  div-info'>
    <label className='desc-div-info'>{proRegistrado.activo}</label>
        <label className='title-div-info'>Activos</label>
</div>
<div className='col-sm-3 col-md-3 col-lg-3  div-info'>
    <label className='desc-div-info'>{proRegistrado.noactivo}</label>
        <label className='title-div-info'>No Activos</label>
</div>
<div className='col-sm-3 col-md-3 col-lg-3 d-flex align-items-center justify-content-center '>
  <button className='btn btn-primary'  onClick={()=>printJS("inventario","html")}>Imprimir invetario </button>
</div>
   </div>

         <div className='row mt-1'>
           <InputSearch
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Detalle..."  
            />
       </div>
       
    </div>
    <div className='div-body' id='inventario'>
      {datos.length > 0 ? 
      <ContainTable>
        <HeaderTable>
          <th onClick={()=>sortItem("descripcion")}><IconSort col="Descripción"/> </th>
          <th onClick={()=>sortItem("fecha_ingreso")}><IconSort col="Ingreso"/></th>
          <th >Comprado</th>
          <th ></th>
          <th >Vendido</th>
          <th ></th>
          <th >Disponible</th>
          <th ></th>
        </HeaderTable>
        <BodyTable>
          {datos.map((item,index)=>(
            <tr key={index}>
             <td>{item.descripcion}</td> 
             <td>{moment(item.fecha_ingreso).format("DD/MM/YYYY")}</td>              
             <td>{Cantidad(item.cantidad,item.vendido,item.factor,item.nombre)} </td>
             <td>{CantidadUnit(item.cantidad,item.vendido,item.prefijo)}</td>
             <td>{Cantidad(0,item.vendido,item.factor,item.nombre)} </td>
             <td>{CantidadUnit(0,item.vendido,item.prefijo)}</td>
             <td>{Cantidad(item.cantidad,0,item.factor,item.nombre)} </td>
             <td>{CantidadUnit(item.cantidad,0,item.prefijo)}</td>
            </tr>
          ))}
        </BodyTable>
      </ContainTable> 
      :
      <Loader/>
       }
      </div>
     
    
         
{/**modal para ingreso de detallemedida */}

  <form
          className="modal fade "
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>{GuardarCambios(e)}}
          
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Detalle Medida</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idstock} onChange={(e) => setIdStock(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" hidden= {true}>Medida</label>
   
          <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproducto}  onChange={(e) => setIdProducto(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Nombre</label>
  
        <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} required/>
      
  </div> 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Cantidad en: </label>
   
          <input type="text" id="form1Example1" className="form-control" value={factor}  onChange={(e) => setFactor(e.target.value)} required />
         
  </div>
 
 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso detallemedida */}

    </>
  )
}

export default Inventario;