
import React,{useContext, useEffect, useState}from 'react'
import {DataLogin} from '../../Context/Context';
import { useDispatch } from 'react-redux';
import Datos from '../../services/Datos';
import { setUser } from '../../app/reducers/user/userSlice';
import Inicio from '../Menu/Inicio';
const md5=require("md5");

function Login() {
  const dispatch=useDispatch();
const [showPassword, setShowPassword] = useState(false)
const [usuario, setUsuario] = useState("")
const [password, setPassword] = useState("")



useEffect(()=>{

},[])


const dataUser = (codigo) => {

  return {
    idusuario:codigo,
    idempleado:0,
    usuario:usuario,
    pass:md5(password)
  }
  
}

     const IniciarSesion=async(e)=>{
        e.preventDefault()

        console.log(usuario)
      
    let datos=await Datos.ConsultaUser(dataUser(0))
    if(typeof datos !=='undefined'){
  console.log(datos.res[0])

      const ls=window.localStorage;
      ls.setItem("usuario",JSON.stringify(datos.res[0])); 

      dispatch(setUser({
        idempleado:datos.res[0].idempleado,
        nombre:datos.res[0].nombre,
        apellido:datos.res[0].apellido,
        idusuario:datos.res[0].idusuario,
        token:datos.res[0].token,
        isLogin:datos.res[0].isLogin,
      }))
      return
    }

    const ls=window.localStorage;   
    ls.clear(); 
    }
  
  return (
    <div className='d-flex justify-content-center align-items-center  vh-100 div-login'>
<form className=' p-5 rounded form-login'  onSubmit={(e)=>IniciarSesion(e)}>
<div className='form-outline mb-4'>
<h4>Iniciar Sesión</h4>
<p>Para ingresar al sistema, ingrese su nombre de usuario y contraseña correcta.</p>
</div>


<div>
<label htmlFor="exampleFormControlInput1" className="form-label">Usuario</label>
<div className="input-group mb-3">
  <span className='input-group-text  '><i className="fa-solid fa-user"></i></span>

<input type="text" className="form-control" value={usuario} onChange={(e)=>setUsuario(e.target.value)} required   />

</div></div>

<div>
<label htmlFor="exampleFormControlInput1" className="form-label">Contraseña</label>
<div className="input-group mb-3">
  <span className='input-group-text '><i className="fa-solid fa-lock"></i></span>
  <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}  required />
  <span className='input-group-text'>   <i className="fa-solid fa-eye" onClick={()=>setShowPassword(!showPassword)}></i></span>


</div></div>
<div className="form-outline mb-4 d-flex justify-content-center align-items-center">

 
  <button type="submit" className="btn btn-primary btn-block mb-4 w-50">Entrar</button>
  
</div>

</form>
    </div>
  )
}

export default Login