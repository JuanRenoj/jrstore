import React, { useEffect,useState } from 'react'
import swal from 'sweetalert';
import Datos from '../../services/Datos'

function FormCliente(props) {

  const [idcliente, setIdCliente] = useState("");
  const [nombre, setNombre] = useState("");   
  const [apellido, setApellido] = useState("");
   const [direccion, setDireccion] = useState("");   
   const [telefono, setTelefono] = useState(""); 
  const [empresa, setEmpresa] = useState(""); 
  const [accion, setAccion] = useState("new");
const [correo, setCorreo] = useState("");

  const [estado, setEstado] = useState("");

  useEffect(()=>{
      console.log(props.Item)
      if(props.Item !== null){
          SetDatos(props.Item)
          return
      }
      limpiar();
    
  },[props.Item])

const DatosCliente = (codigo) => {
  return { 
      idcliente:codigo,
      nombre:nombre,
     apellido:apellido,
      telefono:telefono,
      direccion:direccion,
     correo:correo
  }
}

  const InsertCliente =async () => {
      let insert= await Datos.NuevoReg("cliente",DatosCliente(0));
      if(typeof insert !== 'undefined'){
            await  props.ConsultarCliente(true);
            limpiar();
            swal("Aviso","Cliente ingresado","success")
            return
      }
      swal("Aviso","No se pudo ingresar cliente","error")
  }
  const UpdateCliente = async() => {
      let insert= await Datos.ActualizarReg("cliente",DatosCliente(idcliente));
      if(typeof insert !== 'undefined'){
            await props.ConsultarCliente(true);
            limpiar();
            swal("Aviso","Cliente Actualizado","success")
             return
      }
      swal("Aviso","No se pudo actualizar la informacion del cliente","error")
  }

  const SetDatos = (datos) => {
      setIdCliente(datos.idcliente);        
      setNombre(datos.nombre);
      setTelefono(datos.telefono);
      setApellido(datos.apellido);
      setDireccion(datos.direccion);     
      setCorreo(datos.correo);
      setAccion("update")
      setEstado(datos.estado);
  }
  const limpiar=()=>{
      setIdCliente(0);        
      setNombre("");
      setTelefono("");
      setApellido("");
      setDireccion("");     
      setCorreo("");
      setAccion("new")
      setEstado("Activo");
    }
    const SaveCliente = (e) => {
      e.preventDefault();
      if(accion === "new"){
          InsertCliente();
          return
      }
      UpdateCliente();
      
    }

  return (
    <>
  
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Cliente</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idcliente} onChange={(e) => setIdCliente(e.target.value)} />

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
      <label className="form-label" htmlFor="form1Example1" >Dirección</label>
   
          <input type="text" id="form1Example1" className="form-control" value={direccion}  onChange={(e) => setDireccion(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="number" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => setTelefono(e.target.value.slice(0,8))} required/>
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Correo electrónico</label>
        <input type="email" id="form1Example1" className="form-control" value={correo}  onChange={(e) => setCorreo(e.target.value)} required/>
  </div>
 
 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary me-3"  data-bs-dismiss="modal"   >Cancelar</button>
        <button type="submit" className="btn btn-primary" onClick={SaveCliente} >Guardar</button>
      </div>
   


    </>
  )
}

export default FormCliente