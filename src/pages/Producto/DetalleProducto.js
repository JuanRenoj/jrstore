import React, {useContext, useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import { ItemProducto } from '../../Context/Context';
import swal from "sweetalert";
import { ConvertirAMoneda } from '../../utils/Funciones';
import moment from 'moment/moment';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
function DetalleProducto() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idstock, setIdStock] = useState("");
    const [idproducto, setIdProducto] = useState("");   
    const [nombre, setNombre] = useState("");
     const [factor, setFactor] = useState("");   
   
    const [accion, setAccion] = useState("new");
   const [estado, setEstado] = useState("");

    const [sort, setSort]=useState(false)
 
 
   const{
    productoSelected,
    setProductoSelected,
    verDetalle,
    setVerDetalle,
    ConsultaProducto
   }=useContext(ItemProducto);
    
  
useEffect(()=>{
 
ConsultarDetalleProducto(productoSelected.idproducto);
setIdProducto(productoSelected.idproducto);

},[])

    const ConsultarDetalleProducto=async(codigo)=>{
        const datosDM=await Datos.ConsultaDetalleID("stock",codigo);
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
            ConsultarDetalleProducto(productoSelected.idproducto);
          }
      }
      const Actualizar=async()=>{  
        let datosss=await Datos.ActualizarReg("stock",returnDatos(idstock));
        if(typeof datosss !== 'undefined'){    
            swal("Detalle Producto","Actualizado exitosamente","success");
            ConsultarDetalleProducto(productoSelected.idproducto);
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let datoss=await Datos.BorrarReg("stock",datos.idstock);
        if(typeof datoss!=="undefined"){
            swal("Detalle Producto", "Eliminado con exíto","success")         
            ConsultarDetalleProducto(productoSelected.idproducto);
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

        const sortItem = (param) => { 
          setSort(param)
          if(param){
            datos.sort();
            setDatos( datos =>[...datos]  )
            return
          }
         datos.reverse();
         setDatos(datos=> [...datos])
          
         }

  return (
    <>
    <div className='div-header'>
      
    <div className='row ps-3 mt-2'>

<button className='btn btn-secondary-outline btn-sm d-flex justify-content-start align-items-center btn-op' onClick={()=>{setVerDetalle(false)}}>
<i class="fa-solid fa-chevron-left"></i> <span className='ms-2'>Atras</span>
  </button>
  
   
 </div>
 <div className='mt-1 mb-1'>
    <label className='title-orden'>{`Detalles del Producto:   ${productoSelected.descripcion }` }</label>
    </div> 
         <div className='row mt-1'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Detalle..."  

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
       </div>
       
    </div>
    <div className='div-body'>
{datos.length >0 ? 
<ContainTable>
  <HeaderTable>
  <th>Proveedor  </th>
  <th>Fecha ingreso</th>
  <th>Ubicación  </th>
  <th>Comprado  </th>
  <th>precio de compra  </th>
  <th>vendido  </th>
  <th>Opciones</th>
  </HeaderTable>
  <BodyTable>
    {
      datos.map((item,index) =>(
        <tr key={index}>        
          <td>{item.proveedor}</td>
          <td>{moment( item.fecha_ingreso).format("DD/MM/YYYY")}</td>         
          <td>{item.ubicacion}</td>
          <td>{`${item.cantidad}  ${item.prefijo},  ${Math.round(item.disponible)} ${item.medida}`}</td>
          <td>{ConvertirAMoneda(item.precio_compra) + `    c/${item.prefijo}`  }</td>
          <td>{item.vendido+ " "+item.prefijo }</td>
          <ButtonOptions item={item} Eliminar={Eliminar} Actualizar ={AbrirActualizar} />
        </tr>
       ))
    }
  </BodyTable>
</ContainTable>
:<Loader/> }


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

export default DetalleProducto;