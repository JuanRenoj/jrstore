import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../Login/Login'
import { DataLogin } from '../../Context/Context'
import { setUser } from '../../app/reducers/user/userSlice'
import Menu from './Menu'



function Inicio() {
  const dispatch=useDispatch();
const {isLogin}=useSelector(state => state.user)

//const [isLogin, setIsLogin]=useState(false)

//const [user,setUser]=useState([]);


useEffect(()=>{

Iniciar();
},[])

const Iniciar = () => {
let usuario=JSON.parse( window.localStorage.getItem('usuario'));
console.log(usuario)
  if(usuario !== null){
    dispatch(setUser({
      idempleado:usuario.idempleado,
      nombre:usuario.nombre,
      apellido:usuario.apellido,
      idusuario:usuario.idusuario,
      token:usuario.token,
      isLogin:usuario.isLogin
    }))
  }
 
}
/*
const ValueProvider= {
  isLogin,
  setIsLogin,
  user,
  setUser

}*/

  return (
    <>
      {
        isLogin ? 
        <Menu/>
        :
        <Login/>
    }
  
    {/** 
    <DataLogin.Provider value={ValueProvider}>
    {
        isLogin ? 
        <Menu/>
        :
        <Login/>
    }
    </DataLogin.Provider>*/}
    
     </>

  )
}

export default Inicio
