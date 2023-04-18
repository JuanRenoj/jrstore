import React, { useEffect, useState } from 'react'
import swal from "sweetalert";
import InputSearch from '../../Components/InputSearch';
import Datos from '../../services/Datos';
import IconSort from '../../Components/Buttons/IconSort';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import Loader from '../../Components/Loader';
const md5=require("md5");

function Permiso() {
    const [usuario, setUsuario] = useState("");
    const [idempleado,setIdempleado]=useState("");
    const [pass, setPass]=useState("");
    const [idusuario, setIdusuario]= useState("");
    const [accion,setAccion]=useState("");
    const [datapermiso, setDatapermiso]=useState([]);
    const [dataemplado, setDataempleado]=useState([]);
    const [datamodulo, setDatamodulo]=useState([]);
    const [dataaux,setDataaux]=useState([])
    const [dataperaux,setDataperaux]=useState([])
    const [empleadoSelected,setEmpleadoSelected]=useState([]);
    const [sort, setSort]=useState("ASC");
    const [buscar, setBuscar] =useState("");
    const [buscarPermiso, setBuscarPermiso]= useState("");



useEffect(()=>{
  GetModulo();
GetEmpleado();
swal("Aviso","Cualquier cambio que realiza en los permisos, reinice la sistema para que se aplican los cambios.")
},[])

const GetEmpleado = async () => {
    let datos=await Datos.Consulta("empleado");
    if(typeof datos !== "undefined"){
   //   console.log(datos.res)
        setDataempleado(datos.res);
        setDataaux(datos.res)
        return
    }
    setDataaux([]);
    setDataempleado([]);
}
const GetModulo=async()=>{
  let datos= await Datos.Consulta("permiso");
  if(typeof datos !== 'undefined'){
    console.log(datos.res)
    setDatamodulo(datos.res)
    return
  }
  setDatamodulo([])
}

const GetPermiso =async (item) => {
    setEmpleadoSelected(item)
    setIdempleado(item.idempleado);
    let datos = await Datos.ConsultaDetalleID("permiso",item.idempleado);
    console.log(datos.res)
    if(typeof datos !== 'undefined'){
        setDatapermiso(datos.res)
        setDataperaux(datos.res)
        return
    }
    swal("Aviso","Este Empleado no tiene permiso","warning")
    setDatapermiso([]);
    setDataperaux([])
}

const DataUsuario =(codigo,codempleado, codmodulo,lec)=>{
    return {
        idpermiso:codigo,
        idempleado:codempleado,
        idmodulo:codmodulo,
        acceso:lec  ? 1 : 0,
  
    }
}
const limpiar = () => {
    setIdempleado("");
    setIdusuario("");
    setUsuario("");
    setPass("")
    setAccion("new")

}

const IngresarNuevo = async() => {
 try{
  if(idempleado !== ""){
 await AgregarPermiso()
 await GetPermiso(empleadoSelected)
}else{
  swal("Aviso","Para poder agregar los permiso, primero debe seleccionar el empleado a quien desea otorgarle permisos","warning")
}

 } catch(error){
  console.log(error)
 }
}
const AgregarPermiso = async () => {
  for(let i in datamodulo){
    let datos =await Datos.NuevoReg("permiso", DataUsuario(0,idempleado,datamodulo[i].idmodulo,1))
    if(typeof datos !== 'undefined' ){       
        swal("Aviso","El permiso de ingreso de forma correcta","success");
       // limpiar();     
    }
        
  }
}

const ActualizarRegistro= async (item,newvalor)=>{
    let datos =await Datos.ActualizarReg("permiso",DataUsuario(item.idpermiso,item.idempleado,item.idmodulo,newvalor));
    if(typeof datos !== 'undefined'){
        await GetPermiso(empleadoSelected);
        swal("Aviso","Se actualizo de forma correcta el usuario","success");
        limpiar();
        return
    }
        swal("Aviso","No se pudo actualizar el usuario", "error");
        return

}
const EliminarRegistro =async (codigo) => {
    let datos =await Datos.BorrarReg("usuario",codigo);
    if(typeof datos !== 'undefined'){
        await GetPermiso(idempleado);
        setAccion("new")
        swal("Aviso","Se elimino de forma correcta el usuario","success");
        limpiar();
        return
    }
        swal("Aviso","No se pudo eliminar el usuario", "error");
        return
}

const AbrirActualizar = (row) => {
    setIdempleado(row.idempleado);
    setIdusuario(row.idusuario);
    setUsuario(row.usuario);
   // setPass(row.pass);
    setAccion("update")
}
const AbrirIngreso = (row) => {
  
    setAccion("new")
}
const GuardarCambios =async (e) => {
e.preventDefault();
if(accion === "new"){
 IngresarNuevo()
}else{
ActualizarRegistro()
}  
}
 const Busqueda = (text) => {

  setBuscar(text)
  setDataempleado(dataaux.filter((item)=>{
    return item.nombre.toLowerCase().includes(text.toLowerCase())
  }).map((element)=>{return element})
  )
    
 }
 const BusquedaPermiso = (text) => {

  setBuscarPermiso(text)
  setDatapermiso(dataperaux.filter((item)=>{
    return item.nombre.toLowerCase().includes(text.toLowerCase())
  }).map((element)=>{return element}))
     
 }
const sortItem=(col)=>{
    if(sort === "ASC"){
    let newDatos=[...dataemplado].sort((a,b)=> 
    a[col].toLowerCase()  > b[col].toLowerCase() ? 1 : -1
    )
    setDataempleado(newDatos);
    setSort("DESC");
    return
    }
    let newDatos=[...dataemplado].sort((a,b)=> 
    a[col].toLowerCase()  < b[col].toLowerCase() ? 1 : -1
    )
    setDataempleado(newDatos);
    setSort("ASC");
    return

}
  return (
    <div className='row'>
    <div className='col-md-6 col-sm-12  col-lg-6' >

    <div className='div-header'>
    <label className='title-orden mt-3' >Empleado</label>
    <div className='row mt-3'>
    <InputSearch
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Empleado..."  

            
            />
       </div>
  
    </div>
    <div className='div-body'>
        {dataemplado.length > 0  ?
        <ContainTable>
          <HeaderTable>
          <th onClick={()=>sortItem("nombre")}><IconSort col={"Nombre"}/></th>
            <th onClick={()=>sortItem("apellido")}><IconSort col={"Apellido"}/></th>
          </HeaderTable>
          <BodyTable>
            {
               dataemplado.map((item,index) =>(
                <tr onClick={()=>GetPermiso(item)} key={index}>  
                   <td >{item.nombre} </td>
                   <td>{item.apellido}</td>    
                 </tr>
               )) 
            }
          </BodyTable>
        </ContainTable>
        : <Loader/>}
    </div>
    </div>
    <div className='col-md-6 col-sm-12  col-lg-6' >

    <div className='div-header'>
    <label className='title-orden mt-2' >Permiso del Empleado: {typeof empleadoSelected.nombre !== 'undefined' ? empleadoSelected.nombre +" "+ empleadoSelected.apellido : ""}</label>
    <div className='row mt-2'>
    <InputSearch
            onChange={BusquedaPermiso} 
            value={buscarPermiso} 
            placeholder="Buscar Permiso..."  

            />
       </div>
       <div className='d-flex align-items-center justify-content-center mt-3'>
        {datapermiso.length > 0 ?
       null
            :  <button   
            onClick={IngresarNuevo} className ="btn btn-primary btn-primary-sm w-50">Ingresar Permiso </button>  }
       </div>
  
    </div>
    <div className='div-body'>
 {datapermiso.length > 0 ?
 <ContainTable>
  <HeaderTable>
  <th >Modulo </th>
  <th >Permiso </th>
  </HeaderTable>
  <BodyTable>
{ datapermiso.map((item,index) =>(
            <tr key={index}>
            
               <td >{item.nombre} </td>
               <td>
               <div className="form-check form-switch ">
    <input className="form-check-input" type="checkbox" id="acceso"  checked={item.acceso === 1 ? true : false } onChange={(e)=>ActualizarRegistro(item, e.target.checked)}/>
    </div> 
                </td>
              
             </tr>
           )) }
  </BodyTable>
 </ContainTable>
 :<div></div>
 }
    </div>
    </div>

    </div>
  )
}

export default Permiso