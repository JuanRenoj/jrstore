import React, {useEffect, useState}from 'react'

import swal from "sweetalert";
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import Estado from '../../Components/Estado';
import IconSort from '../../Components/Buttons/IconSort';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import Loader from '../../Components/Loader';

function Empleado() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idempleado, setIdEmpleado] = useState("");
    const [nombre, setNombre] = useState("");   
    const [apellido, setApellido] = useState(""); 
    const [dpi, setDpi] = useState("");  
    const [telefono, setTelefono] = useState(""); 
    const [correo, setCorreo] = useState(""); 
    const [direccion, setDireccion] = useState("");    
    const [estado, setEstado] = useState("Activo");
    const [accion, setAccion] = useState("new");
    const [sort, setSort]=useState("ASC");
    //const {datos,setDatos}=useFetchData("empleado")

useEffect(()=>{
ConsultarEmpleado();
},[])

    const ConsultarEmpleado=async()=>{
        const datos=await Datos.Consulta("empleado");
        console.log(datos)
        if(typeof datos !== 'undefined'){
           console.log(datos.res);
         setDatos(datos.res);
          setDatosAux(datos.res)   
          return          
        }
        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdEmpleado(0);
        setDpi("");
        setNombre("");
        setTelefono("");
        setApellido("");
        setCorreo("");
        setEstado("Activo");
      }
      const returnDatosEmpleado = (codigo) => { 
        return { 
            idempleado:codigo,
            nombre:nombre,
            apellido:apellido,
            dpi:dpi,
            telefono:telefono,
            estado:estado,
           correo:correo}
       }
      const Ingresar=async()=>{   
        let empleado=await Datos.NuevoReg("empleado",returnDatosEmpleado(0));
        if(typeof empleado !== 'undefined'){
      swal("Empleado","Ingresado exitosamente","success");
           limpiar();
            ConsultarEmpleado();
          }
      }
      const Actualizar=async()=>{  
        let empleado=await Datos.ActualizarReg("empleado",returnDatosEmpleado(idempleado));
        if(typeof empleado !== 'undefined'){    
            swal("Empleado","Actualizado exitosamente","success");
            ConsultarEmpleado();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let empleado=await Datos.BorrarReg("empleado",datos.idempleado);
        if(typeof empleado!=="undefined"){
            swal("Empleado", "Eliminado con exíto","success")         
            ConsultarEmpleado();
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
  setIdEmpleado(datos.idempleado);
  setNombre(datos.nombre);
  setApellido(datos.apellido);
  setTelefono(datos.telefono);
  setEstado(datos.estado);
  setDpi(datos.dpi);
  setCorreo(datos.correo);
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{
       
        setBuscar(text);
        
      setDatos(datosAux.filter((item)=>{
            return   item.nombre.toLowerCase().includes(text.toLowerCase()) || item.apellido.toLowerCase().includes(text.toLowerCase());   
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
            if(sort==="ASC"){
             let sorted=[...datos.sort((a,b)=>
               a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
             )]
             setDatos(sorted)
             setSort("DESC")
             return
            }
            let sorted=[...datos.sort((a,b)=>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            )]
            setDatos(sorted)
            setSort("ASC")
            
             
            }
   

  return (
    <>
    <div className='div-header'>
    <label className='title-orden mt-3' >Empleado</label>
      <div className='row mt-3'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Empleado..."  

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
       </div>
       
    </div>
    <div className='div-body'>
      {datos.length > 0 ? 
      <ContainTable>
        <HeaderTable>
           <th onClick={()=>sortItem("nombre")}><IconSort col="Nombre"/></th>
           <th onClick={()=>sortItem("apellido")}><IconSort col="Apellido"/></th>
           <th onClick={()=>sortItem("dpi")}><IconSort col="DPI"/></th>
       
            <th>Telefono</th>
            <th>Correo</th>      
            <th onClick={()=>sortItem("estado")}><IconSort col="Estado"/></th>        
            <th>Opciones</th>
        </HeaderTable>
        <BodyTable>
{ datos.map((item,index) =>(
            <tr key={index}> 
               <td>{item.nombre}</td>
               <td>{item.apellido}</td>
               <td>{item.dpi}</td>
               <td>{item.telefono}</td>
               <td>{item.estado}</td>
               <td><Estado estado={item.estado}/> </td>
              <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar} />
             </tr>))
             }
        </BodyTable>
      </ContainTable> 
      : 
      <Loader/>
      }

      </div>
     
    
         
{/**modal para ingreso de empleado */}

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
        <h5 className="modal-title">Ingreso de Empleado</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idempleado} onChange={(e) => setIdEmpleado(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Apellido</label>
  
        <input type="text" id="form1Example1" className="form-control" value={apellido}  onChange={(e) => setApellido(e.target.value)} required/>
      
  </div> 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Dpi</label>
   
          <input type="text" id="form1Example1" className="form-control" value={dpi}  onChange={(e) => setDpi(e.target.value.slice(0,11))} required />
         
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="number" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => setTelefono(e.target.value.slice(0,8))} required/>
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Correo electrónico</label>
        <input type="email" id="form1Example1" className="form-control" value={correo}  onChange={(e) => setCorreo(e.target.value)} required/>
  </div>
 
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio3" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setEstado("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio3">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio4" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setEstado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio4">No activo</label>
  </div>
</div>
  </div>

    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso empleado */}

    </>
  )
}

export default Empleado