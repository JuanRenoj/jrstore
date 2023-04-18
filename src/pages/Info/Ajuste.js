import React,{useState,useEffect} from 'react'
import swal from "sweetalert";
import Datos from '../../services/Datos';
import { urlImg } from '../../services/Host';


function Ajuste(props) {
 

const [idinfo, setidinfo] = useState("")
const [nombre, setnombre] = useState("")
const [descripcion, setdescripcion] = useState("")
const [direccion, setdireccion] = useState("")
const [telefonos, settelefonos] = useState("")
const [correo, setcorreo] = useState("")
const [logo, setlogo] = useState("")
const [logoAnterior, setlogoAnterior] = useState("")
const [accion, setaccion] = useState("new")
const [preViewLogo, setpreViewLogo] = useState("")

useEffect(()=>{
 Info()

},[])

async function  Info(){
  let info= await Datos.Consulta("info");
  console.log(info.res)
  if(typeof info!=='undefined'){
    //setinformacion(info.res)
    SetDatos(info.res[0])
    return
  }
  //setinformacion([])

 }

 const datosInfo=(codigo,namelogo)=>{
  return {
    idinfo: codigo,
    nombre:nombre,
    descripcion:descripcion,
    direccion:direccion,
    telefonos:telefonos,
    correo:correo,
    logo:namelogo
  }
 }

  const SetDatos = (item) => {
    setidinfo(item.idinfo)
    setnombre(item.nombre)
    setdescripcion(item.descripcion)
    setdireccion(item.direccion)
    settelefonos(item.telefonos)
    setcorreo(item.correo)
    setlogo(item.logo)
    setlogoAnterior(item.logo)
    setpreViewLogo(urlImg+item.logo)
    setaccion("update")

  }
const IngresarNuevaInfo =async () => {
  const newImage= logo;
let newinfo= await Datos.NuevoReg("info",datosInfo(0,newImage.name));
if(typeof newinfo !== 'undefined'){
  await SubirImagen(newImage)
   await props.GetInfo()

  swal("Aviso","Informacion ingresado correctamente","success");
  return
}
swal("Aviso","No se pudo ingresar la informacio","error")
}
const ActuallizarInfo = async() => {
  const newImage=logo;
  let nomImagen=logo === logoAnterior ? logo : logo.name;
console.log(datosInfo(idinfo,nomImagen))
let newinfo= await Datos.ActualizarReg("info",datosInfo(idinfo,nomImagen));
if(typeof newinfo !== 'undefined'){
 
  await ActualizarImagen(newImage)
  await props.GetInfo()

  swal("Aviso","La informacion se actualizo  correctamente","success");
  return
}
swal("Aviso","No se pudo actualizar la informacio","error")
}

const GuardarCambios =  (e) => {
  e.preventDefault();
if(accion==="new"){
  IngresarNuevaInfo()
  return
}
ActuallizarInfo();
  
}
 // funciones para subir imagenes al servidor
 const SubirImagen =async (file) => {
  const dataImagen=await Datos.UplodaImg(file)
  if(typeof dataImagen !=='undefined'){
  return 
  }
  swal("Aviso","No se pudo subir la imagen","error")
  
 }
  const ActualizarImagen = async(img) => {
    
    if(logoAnterior !== img){
      SubirImagen(img)
      BorrarImage(logoAnterior)

    }
  
   
  }

   const GetPreview = (file,setPreview) => { 
      let reader=new FileReader();
      reader.onloadend=function(e){
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }

   

    const BorrarImage =async (name) => {
      const dataImage=Datos.DeleteImage(name);
      if(typeof dataImage !=='undefined'){
       
     
        return
      }
      swal("Aviso","no se pudo borrar la imagen","error")
    }
// final de de procesos de la imagen
  return (
    <>

    <div className='w-75 p-5  '>
    
  <form
          className=""
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>{GuardarCambios(e)}}
          
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Información de la empresa</h5>       
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-2">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control form-control-sm" hidden= {true} value={idinfo} onChange={(e) => setidinfo(e.target.value)} />

  </div>
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Nombre de la empresa</label>
   
          <input type="text" id="form1Example1" className="form-control form-control-sm" value={nombre}  onChange={(e) => setnombre(e.target.value)} required />
         
  </div>
  
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Descripción de la empresa</label>
   
          <input type="text" id="form1Example1" className="form-control form-control-sm" value={descripcion}  onChange={(e) => setdescripcion(e.target.value)} required />
         
  </div>
 
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Dirección de la empresa</label>
   
          <input type="text" id="form1Example1" className="form-control form-control-sm" value={direccion}  onChange={(e) => setdireccion(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Telefonos de la empresa</label>
   
          <input type="text" id="form1Example1" className="form-control form-control-sm" value={telefonos}  onChange={(e) => settelefonos(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Correo de la empresa</label>
   
          <input type="email" id="form1Example1" className="form-control form-control-sm" value={correo}  onChange={(e) => setcorreo(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-2">
          <label  className="form-label" htmlFor="form1Example1" >Foto del producto</label>
        <div className="custom-file"> 
    <input type="file" className="form-control  form-control-sm"  id="formFile"  aria-describedby="inputGroupFileAddon01" name={logo} onChange={(e)=>{setlogo(e.target.files[0]); GetPreview(e.target.files[0],setpreViewLogo)}} />
    <img src={preViewLogo} alt="logo" height={60} width={60}></img>
  </div>
  </div>
 
  
    </div>
      <div className="modal-footer">
       
        <button type="submit" className="btn btn-primary me-5" >Guardar</button>
      </div>
    </div>
  </div>
</form>
</div>
    </>
  )
}

export default Ajuste