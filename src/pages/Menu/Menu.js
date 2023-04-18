import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DataLogin } from '../../Context/Context'
import { useDispatch, useSelector} from 'react-redux';
import { unsetUser } from '../../app/reducers/user/userSlice';



import Categoria from '../Categoria/Categoria';
import Cliente from '../Cliente/Cliente';
import ItemMenu from '../../Components/ItemMenu';
import Empleado from '../Empleado/Empleado';
import Medida from '../Medida/Medida';
import Compras from '../Producto/Compras'
import Precio from '../Producto/Precio';
import Producto from '../Producto/Producto';
import Proveedor from '../Proveedor/Proveedor';
import Ubicacion from '../Ubicacion/Ubicacion';
import Venta from '../Venta/Venta';
import Defualt from './Defualt';
import { urlImg } from '../../services/Host';
import Ajuste from '../Info/Ajuste';
import Datos from '../../services/Datos';
import Informe from '../Informe/Informe';
import Usuario from '../Empleado/Usuario';
import Permiso from '../Empleado/Permiso';
import ProductoMasVendido from '../Informe/ProductoMasVendido';
import Balance  from '../Informe/Balance';
import VentaRealizada from '../Venta/VentaRealizada';
import Inventario from '../Producto/Inventario';
import Loader from '../../Components/Loader';

const md5=require("md5");

function Menu() {
 // const {setIsLogin,isLogin} =useContext(DataLogin);
 const dispatch=useDispatch();
 const {idempleado}=useSelector(state=>state.user)

  const [toogle, setToogle]=useState(true);
  const [screen,setScreen]=useState("Default");
  const [permiso,setPermiso]=useState([]);
  const classSide= toogle ? "div-left open" : "div-left";
  const iconMenu = toogle ? "fa-solid fa-xmark icon-menu" : " fa-solid fa-bars icon-menu"
const [prefil, setprefil] = useState("")
const [informacion, setinformacion] = useState([])

useEffect(()=>{

  GetPermiso(idempleado)
GetInfo()
},[])

 async function  GetInfo(){
  let info= await Datos.Consulta("info");
 
  if(typeof info!=='undefined'){
    setinformacion(info.res)
    setprefil(info.res[0].logo)
    return
  }
  setinformacion([])

 }

const GetPermiso =async (codigo) => {
  let datos=await Datos.ConsultaDetalleID("permiso",codigo)
  if(typeof datos!== 'undefined'){
    console.log(datos.res)
    setPermiso(datos.res);
    return
  }
  setPermiso([])
}

const getAcceso = (modulo) => {
  if(permiso.length > 0){
    for(let i in permiso)
    {
      if(permiso[i].nombre === modulo){
        if(Number(permiso[i].acceso) === Number(1)){
          return true
        }
        return false;
      }
    }
  }
}


const ContentCenter = 
useCallback(
   () => { 
    switch (screen) {
      case "Proveedor":
        if(getAcceso("Proveedor")){
             return <Proveedor />;
        }
        return <Defualt  />;

      case "Cliente":
        if(getAcceso("Cliente")){
          return <Cliente />;
        }
        return <Defualt  />;

      case "Empleado":
        if(getAcceso("Empleado")){
          return <Empleado />;
        }
        return <Defualt />;
      case "Categoria":
        if(getAcceso('Categoria')){
        return <Categoria />;
        }
        return <Defualt />;
      case "Medida":
        if(getAcceso('Medida')){
            return <Medida />;
        }
        return <Defualt  />;
      case "Ubicacion":
        if(getAcceso('Ubicacion')){
            return <Ubicacion />;
        }
        return <Defualt />;
      case "Producto":
        if(getAcceso('Producto')){
             return <Producto />;
        }
        return <Defualt />;
      case "Compras":
        if(getAcceso('Compras')){
           return <Compras />;
        }
        return <Defualt />;
        case "Inventario":
          if(getAcceso('Inventario')){
             return <Inventario />;
          }
          return <Defualt  />;
      case "Precio":
        if(getAcceso('Precio')){
           return <Precio />; 
        }
        return <Defualt />;
      case "Ventas":
        if(getAcceso('Ventas')){
          return <VentaRealizada />;
        }
        return <Defualt />;
        case "Punto de Venta":
          if(getAcceso('Punto de Venta')){
            return <Venta />;
          }
          return <Defualt  />;
      case "Ajuste":
        if(getAcceso("Ajuste")){
              return <Ajuste GetInfo={GetInfo}/>; 
        }
        return <Defualt  />;
      case "Informe":
        if(getAcceso('Informe')){
           return <Informe/> 
        }
        return <Defualt/>;
        case "Producto mas Vendido":
          if(getAcceso('Producto mas Vendido')){
             return <ProductoMasVendido /> 
          }
          return <Defualt />;
          case "Balance":
            if(getAcceso('Balance')){
               return <Balance /> 
            }
            return <Defualt />;
        case "Usuario":
          if(getAcceso('Usuario')){
             return <Usuario/>
          }
          return <Defualt/>;
        case "Permiso":
          if(getAcceso('Permiso')){
             return <Permiso/>
          }
          return <Defualt  />;
      default:
        return <Defualt  />;
    }}
     ,[screen]);

const CerrarSesion = () => {
  window.localStorage.clear();
  dispatch(unsetUser())
}

  return (
    <div className='div-main bg-dark'>
        <div className={ classSide }> 
        <div className='place-menu'>
        <i className={iconMenu} onClick={()=>setToogle(!toogle)}></i>
      </div>
       <div className='info-user'>
        <img src={`${urlImg}${prefil}`} alt="perfil" width="45" height="45" className="rounded-circle bg-white"/>
        <span className='nameStore'>{informacion.length > 0 ?informacion[0].nombre : "Nombre"}</span>
        <span className='nameUser'>{informacion.length > 0 ?informacion[0].descripcion : "Descripcion"}</span>
              
    
</div>
<div className='divide'>
  <hr/>
</div>

        <ul className='list-items'>
       <li>
        <ItemMenu
        icon="fa-solid fa-box"
        title="Producto"
        detalle={true}
        onClick={setScreen}
        screen="Producto"
        active={screen === "Producto" ? true : false}
        >
           <li onClick={()=>setScreen("Compras")} className={ screen ==="Compras"? "op-active" : ""}><i className="fa-solid fa-cart-arrow-down"></i><span>Compra</span></li>
            <li onClick={()=>setScreen("Inventario")} className={ screen ==="Inventario"? "op-active" : ""}><i className="fa-sharp fa-solid fa-boxes-stacked"></i><span>Inventario</span></li>
            <li onClick={()=>setScreen("Medida")} className={ screen ==="Medida"? "op-active" : ""}><i className="fa-solid fa-weight-scale"></i><span>Unidad de Medida</span></li>
            <li onClick={()=>setScreen("Categoria")} className={ screen ==="Categoria"? "op-active" : ""}><i className="fa-solid fa-arrow-up-short-wide"></i><span>Categoria</span></li>
            <li onClick={()=>setScreen("Ubicacion")} className={ screen ==="Ubicacion"? "op-active" : ""}><i className="fa-solid fa-store"></i><span>Ubicación</span></li>
            <li onClick={()=>setScreen("Precio")} className={ screen ==="Precio"? "op-active" : ""}><i className="fa-solid fa-tag"></i><span>Precio</span></li>
         {/** 
            <li onClick={()=>setScreen("Preciocliente")} className={ screen ==="Preciocliente"? "op-active" : ""}><i className="fa-solid fa-user-tag"></i><span>Precio por Cliente</span></li>
     */}
        </ItemMenu>
       </li>
       <li>
        <ItemMenu
        icon="fa-solid fa-cart-arrow-down"
        title="Punto de Venta"
        detalle={true}
        onClick={setScreen}
        screen="Punto de Venta"
        active={screen === "Punto de Venta" ? true : false}
        >
            <li onClick={()=>setScreen("Ventas")} className={ screen ==="Ventas"? "op-active" : ""}><i className="fa-solid fa-cart-plus"></i> <span>Ventas</span></li>
          {/**  <li><i className="fa-sharp fa-solid fa-boxes-stacked"></i> <span>Cotizacion</span></li> 
            <li><i className="fa-solid fa-weight-scale"></i> <span>Devolución</span></li>
            <li><i className="fa-solid fa-tag"></i> <span>Anular Ventas</span></li>
          */} 
       
      </ItemMenu>
       </li>
  
       <li>
        <ItemMenu
        icon="fa-solid fa-users"
        title="Proveedor"
        detalle={false}
        onClick={setScreen}
        screen="Proveedor"
        active={screen === "Proveedor" ? true : false}
        />
 
       </li>
       <li>
        <ItemMenu
        icon="fa-solid fa-user"
        title="Empleado"
        detalle={true}
        onClick={setScreen}
        screen="Empleado"
        active={screen === "Empleado" ? true : false}
        >
         <li onClick={()=>setScreen("Permiso")} className={ screen ==="Permiso"? "op-active" : ""}><i className="fa-solid fa-user-lock"></i><span>Permisos</span></li>
         <li onClick={()=>setScreen("Usuario")} className={ screen ==="Usuario"? "op-active" : ""}><i className="fa-solid fa-user-check"></i> <span>Usuarios</span></li>

        </ItemMenu>
 
       </li>

       <li>
        <ItemMenu
        icon="fa-solid fa-user"
        title="Cliente"
        detalle={false}
        onClick={setScreen}
        screen="Cliente"
        active={screen === "Cliente" ? true : false}
        />
 
       </li>
       <li>
    {/**     <ItemMenu
        icon="fa-solid fa-arrow-up-short-wide"
        title="Categoria"
        detalle={false}
        onClick={setScreen}
        screen="Categoria"
        active={screen === "Categoria" ? true : false}
        />*/}
 
       </li>

       <li>
        <ItemMenu
        icon="fa-solid fa-chart-simple"
        title="Informe"
        detalle={true}
        onClick={setScreen}
        screen="Informe"
        active={screen === "Informe" ? true : false}
        >
            <li onClick={()=>setScreen("Producto mas Vendido")} className={ screen ==="Producto mas Vendido"? "op-active" : ""}><i className="fa-solid fa-chart-pie"></i><span>Producto mas Vendido</span></li>
            <li onClick={()=>setScreen("Balance")} className={ screen ==="Balance"? "op-active" : ""}><i className="fa-solid fa-chart-column"></i> <span>Balance</span></li>
         
        </ItemMenu>
 
       </li>
       <li>
        <ItemMenu
        icon="fa-solid fa-gear"
        title="Ajuste"
        detalle={false}
        onClick={setScreen}
        screen="Ajuste"
        active={screen === "Ajuste" ? true : false}
       />
       </li>

          
        </ul>
        <div onClick={()=>CerrarSesion()} className=  "div-log-out">
            <div className='p-2' >
            <i className="fa-solid fa-right-from-bracket "></i>
            <span className='ms-2'> Salir</span>
            </div>
          </div>
          
        </div> 
     
        <div className='div-center'> 
        <ContentCenter />
         </div>
    </div>
  )
}

export default Menu