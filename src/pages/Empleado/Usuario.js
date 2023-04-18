import React, { useEffect, useState } from 'react'
import swal from "sweetalert";
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import InputSearch from '../../Components/InputSearch';
import IconSort from '../../Components/Buttons/IconSort';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import Loader from '../../Components/Loader';
const md5=require("md5");
const bootstrap=require("bootstrap");

function Usuario() {
    const [usuario, setUsuario] = useState("");
    const [idempleado,setIdempleado]=useState("");
    const [pass, setPass]=useState("");
    const [idusuario, setIdusuario]= useState("");
    const [accion,setAccion]=useState("");
    const [datausuario, setDatausuario]=useState([]);
    const [datausuarioaux, setDatausuarioaux]=useState([]);
    const [dataemplado, setDataempleado]=useState([]);
    const [dataaux,setDataaux]=useState([])
    const [empleadoSelected,setEmpleadoSelected]=useState([]);
    const [sort, setSort]=useState("ASC");
    const [buscar, setBuscar] =useState("");
    const [buscarUsuario, setBuscarUsuario] =useState("");




useEffect(()=>{
GetEmpleado();
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
const GetUsusario =async (codigo) => {

    let datos = await Datos.ConsultaDetalleID("usuario",codigo);
    console.log(datos.res)
    if(typeof datos !== 'undefined'){
        setDatausuario(datos.res)
        setDatausuarioaux(datos.res)
        return
    }
    swal("Aviso","Este Empleado no tiene usuario","warning")
    setDatausuario([]);
    setDatausuarioaux([])
}

const VerUsuario = (item) => {
  setEmpleadoSelected(item)
    setIdempleado(item.idempleado);
    GetUsusario(item.idempleado)
  
}
const DataUsuario =(codigo)=>{
    return {
        idusuario:codigo,
        idempleado:idempleado,
        usuario:usuario,
        pass: md5(pass) 
    }
}
const limpiar = () => {
    //setIdempleado("");
    //setIdusuario("");
    setUsuario("");
    setPass("")
    setAccion("new")

}

const IngresarNuevo = async() => {
    let datos =await Datos.NuevoReg("usuario", DataUsuario(0))
    if(typeof datos !== 'undefined' ){
        await GetUsusario(idempleado)
        swal("Aviso","El usuario de ingreso de forma correcta","success");
        limpiar();
        return
    }
        swal("Aviso","No se pudo ingresar el usuario","error");
         return

}
const ActualizarRegistro= async ()=>{
   let idempleados=idempleado;
    let datos =await Datos.ActualizarReg("usuario",DataUsuario(idusuario));
    if(typeof datos !== 'undefined'){
     
        await GetUsusario(idempleados);
        swal("Aviso","Se actualizo de forma correcta el usuario","success");
        limpiar();
        return
    }
        swal("Aviso","No se pudo actualizar el usuario", "error");
        return

}
const EliminarRegistro =async (item) => {
    let datos =await Datos.BorrarReg("usuario",item.codigo);
    if(typeof datos !== 'undefined'){
        await GetUsusario(idempleado);
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
const AbrirIngreso = () => {
  if(typeof empleadoSelected.nombre !== 'undefined'){
  limpiar()
  let myModal=new bootstrap.Modal(document.getElementById("exampleModal"));
  myModal.show();
    setAccion("new")
    return
  }
  swal("Aviso","Para poder agregar un nuevo usuario, primero debe seleccionar al empleado.","warning" )
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
  setDataempleado(dataaux.filter((item)=> {
    return item.nombre.toLowerCase().includes(text.toLowerCase())
  }).map((element)=>{return element}))
    
 }
 
 const BusquedaUsuario = (text) => {
 
  setBuscarUsuario(text)
  setDatausuario(datausuarioaux.filter((item)=> {
    return item.usuario.toLowerCase().includes(text.toLowerCase())
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
        {dataemplado.length >0 ?
        <ContainTable>
          <HeaderTable>
          <th onClick={()=>sortItem("nombre")}><IconSort col={"Nombre"}/></th>
            <th onClick={()=>sortItem("apellido")}><IconSort col={"Apellido"} /></th>
          </HeaderTable>
          <BodyTable>
            {
            dataemplado.map((item,index) =>(
              <tr onClick={()=>VerUsuario(item)} key={index}>
                <td >{item.nombre} </td>
                <td>{item.apellido}</td>
              </tr>
            )) 
            }
          </BodyTable>
        </ContainTable>
        :<Loader/>}


    </div>
    </div>
    <div className='col-md-6 col-sm-12  col-lg-6' >

    <div className='div-header'>
    <label className='title-orden mt-3' >Usuario del Empleado: {typeof empleadoSelected.nombre !== 'undefined' ? empleadoSelected.nombre +" "+ empleadoSelected.apellido : ""}</label>
    <div className='row mt-3'>
    <SearchBar
            onChange={BusquedaUsuario} 
            value={buscarUsuario} 
            placeholder="Buscar Usuario..."  

            data_bs_toggle=""
            data_bs_target=""
            onClick={AbrirIngreso}
            />
       </div>
  
    </div>
    <div className='div-body'>
      {datausuario.length > 0 
      ? 
      <ContainTable>
        <HeaderTable>
        <th >Usuario </th>
        <th >Contraseña </th>
        <th >Opciones </th>
        </HeaderTable>
        <BodyTable>{
        datausuario.map((item,index) =>(
            <tr key={index}>
               <td >{item.usuario} </td>
               <td><i class="fa-solid fa-ellipsis"></i><i class="fa-solid fa-ellipsis"></i> </td>   
                <ButtonOptions item={item} Eliminar={EliminarRegistro} Actualizar={AbrirActualizar} />
             </tr>
           )) }
        </BodyTable>
      </ContainTable>
      :
      <div></div>

      }
  

    </div>
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
         <label className="form-label" htmlFor="form1Example2" hidden= {true} >codigemp </label>   
    <input type="text" id="form1Example2" className="form-control" hidden= {true} value={idempleado} onChange={(e) => setIdempleado(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idusuario} onChange={(e) => setIdusuario(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example3">Nombre de usuario</label>
   
          <input type="text" id="form1Example3" className="form-control" value={usuario}  onChange={(e) => setUsuario(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example4" >Contraseña</label>
  
        <input type="password" id="form1Example4" className="form-control" value={pass}  onChange={(e) => setPass(e.target.value)} required/>
      
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
    </div>
  )
}

export default Usuario