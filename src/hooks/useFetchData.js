import { useState,useEffect } from "react";
import Datos from "../services/Datos";

function useFetchData(tabla){
const[datos,setDatos]=useState([])
const[load,setLoad]=useState(false)
useEffect(()=>{
    if(!load){
    let data=Datos.Consulta(tabla);
    if(typeof data !== 'undefined'){
        setDatos(datos.res);
        setLoad(true)
     return   
     
    }
    setDatos([])
    setLoad(true)
}
},[load])
return {datos, setDatos}
}
export default useFetchData