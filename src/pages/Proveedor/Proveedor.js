import React, {useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import swal from "sweetalert";
import IconSort from '../../Components/Buttons/IconSort';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
function Proveedor() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idproveedor, setIdProveedor] = useState("");
    const [nombre, setNombre] = useState("");
    const [empresa, setEmpresa] = useState(""); 
    const [accion, setAccion] = useState("new");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState(""); 
    const [direccion, setDreccion] = useState("");
    const [estado, setEstado] = useState("");
    const [sort, setSort]=useState("ASC")
useEffect(()=>{
ConsultarProveedor();
},[])

    const ConsultarProveedor=async()=>{
        const datos=await Datos.Consulta("proveedor");
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
        setIdProveedor(0);
           setEmpresa("");
        /*setNombre("");
        setTelefono("");
        setApellido("");
        setDreccion("");
     
        setSexo("");
        setEstado("Activo");*/
      }
      const Ingresar=async()=>{
 
        let datos={
          idproveedor:0,
          nombre:nombre,
         apellido:apellido,
          telefono:telefono,
          direccion:direccion,
       
          empresa:empresa,
      
          estado:estado
        }
     
        let proveedor=await Datos.NuevoReg("proveedor",datos);
        if(typeof proveedor !== 'undefined'){
      swal("Proveedor","Ingresado exitosamente","success");
           limpiar();
            ConsultarProveedor();
          }
      }
      const Actualizar=async()=>{
        let datos={
          idproveedor:idproveedor,
          nombre:nombre,
          apellido:apellido,
          telefono:telefono,
          direccion:direccion,
       
          empresa:empresa,
  
          estado:estado
        }
        console.log(datos);
        let proveedor=await Datos.ActualizarReg("proveedor",datos);
        if(typeof proveedor !== 'undefined'){    
            swal("Proveedor","Actualizado exitosamente","success");
            ConsultarProveedor();
            limpiar();
          }
      }
      const Eliminar=async(datos)=>{
        let proveedor=await Datos.BorrarReg("proveedor",datos.idproveedor);
        if(typeof proveedor!=="undefined"){
            swal("Proveedor", "Eliminado con exíto","success")         
            ConsultarProveedor();
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
  setIdProveedor(datos.idproveedor);
  setNombre(datos.nombre);
  /*setNombre(datos.nombre);
  setApellido(datos.apellido);
  setTelefono(datos.telefono);
  setDreccion(datos.direccion);
  setSexo(datos.sexo);
  setEstado(datos.estado)*/
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{
        setBuscar(text);
        setDatos(datosAux.filter((item)=>{
            return   item.nombre.toLowerCase().includes(text.toLowerCase()) ;   
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
            let newDatos=[...datos].sort((a,b)=>
            a[col].nombre > b[col].nombre ? 1 : -1)
            setDatos(newDatos)
            setSort("DESC")
            return
          }
          let newDatos=[...datos].sort((a,b)=>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
          setDatos(newDatos)
          setSort("ASC")
          
         }

  return (
    <>
    <div className='div-header'>
    <label className='title-orden mt-3'>Proveedor</label>
      <div className='row mt-3'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Cliente..."  

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
        <th onClick={()=>sortItem("nombre")}> <IconSort col="Nombre"/> </th>
        <th>Opciones</th>
        </HeaderTable>
        <BodyTable>
       { datos.map((item,index) =>(
            <tr key={index}>
               <td>{item.nombre}</td>
               <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar} />
             </tr>
           )) 
       }
        </BodyTable>
      </ContainTable>
      : 
      <Loader/>
      }
      </div>
     
    
         
{/**modal para ingreso de proveedor */}

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
        <h5 className="modal-title">Ingreso de Empresa</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproveedor} onChange={(e) => setIdProveedor(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Nombre de empresa</label>
  
        <input type="text"  id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} required/>
      
  </div>
 {/* <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Apellido</label>
  
        <input type="text" id="form1Example1" className="form-control" value={apellido}  onChange={(e) => setApellido(e.target.value)} required/>
      
  </div> 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Dirección</label>
   
          <input type="text" id="form1Example1" className="form-control" value={direccion}  onChange={(e) => setDreccion(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="number" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => setTelefono(e.target.value.slice(0,8))} required/>
  </div>
 
  
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Sexo</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="sexo" id="inlineRadio1" value={sexo} checked={sexo === "Hombre" ? true : false} onChange={() => setSexo("Hombre")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio1">Hombre</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="sexo" id="inlineRadio2" value={sexo} checked={sexo === "Mujer" ? true : false} onChange={() => setSexo("Mujer")}/>
  <label className="form-check-label" htmlFor="inlineRadio2">Mujer</label>
  </div>
</div>
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
  </div>*/}
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso proveedor */}

    </>
  )
}

export default Proveedor