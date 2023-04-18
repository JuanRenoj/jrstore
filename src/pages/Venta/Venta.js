import React, {useEffect, useState}from 'react'
import Datos from '../../services/Datos';
import swal from "sweetalert";
import moment from 'moment/moment';
import { ConvertirAMoneda, ProductoAListaDropDown } from '../../utils/Funciones';
import { urlImg } from '../../services/Host';
import CardProducto from '../../Components/CardProducto';
import InputSearch from '../../Components/InputSearch';
import printJS from 'print-js';
import FormCliente from '../../Components/Forms/FormCliente';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import Loader from '../../Components/Loader';
const bootstrap = require('bootstrap');
function Venta() {
  const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [datosc, setDatosc]=useState([]);
    const [datoscat,setDatosCat]=useState([])
    const[categoria, setcategoria]=useState("Todo");
    const[facturaingresado, setFacturaIngresado]=useState("")
    const [newClient, setnewClient] = useState(false);
   

// datos de factura 
const[idfactura, setIdfactura]=useState("")
const[idcliente, setIdCliente]=useState("")
const[idempleado, setIdEmpleado]=useState("")
const[total, setTotal]=useState("")
const[estado, setEstado]=useState("Vendido")
const[lugar, setLugar]=useState("Tienda")
const [viewpdf, setviewpdf] = useState(false)

//auxiliares para editar precio y cantidad

const [factor,setfactor]=useState("");
const [codPresentacion, setcodPresentacion] = useState("")
const [cantidad, setCantidad] = useState("");
const cantfinal =(factor * cantidad).toFixed(2);
const[prefijo, setPrefijo]=useState("");
const [idprecio,setidprecio]=useState("");
const [precio, setprecio] = useState("")


    const [datosdm, setDatosdm]=useState([]);
    const [datosp, setDatosp]=useState([]);

    const [detallefac, setDetalleFac]=useState([]);
  


     const [nombremedida,setNombreMedidad]=useState("");
     const [detallemedida, setDetallemedida] = useState(""); 
     const [proSeleccionado,setProSeleccionado] =useState("");
     const [subtotal,setSubtotal]=useState("");
     
     const [descuento,setDescuento]=useState("")
     const [recibido,setRecibido]=useState("");  
     const [CodeBarr, setCodeBarr] = useState("")
     const cambio=Number(recibido)>0 ? (Number(recibido)-Number(total)).toFixed(2) : 0;

   

useEffect(()=>{
  ConsultarCliente(false);
  ConsultarStock();
  ConsultaCategoria();
  enfocarCodeBar()
  },[])

  const enfocarCodeBar = () => {
   document.getElementById("barCode").focus();
  }
  
  const ConsultarStock=async()=>{
    const datoss=await Datos.Consulta("stockventa");
    console.log(datoss)
    if(typeof datoss !== 'undefined'){
        console.log(datoss.res);
      setDatos(datoss.res);
      setDatosAux(datoss.res)   
      
      return          
    }
    setDatos([])
    setDatosAux([])
  }
  const ConsultarCliente=async(ultimo)=>{
    const datos=await Datos.Consulta("cliente");
    console.log(datos)
    if(typeof datos !== 'undefined'){
       console.log(datos.res);
      setDatosc(datos.res);
     if(ultimo){
        setIdCliente(datos.res[datos.res.length - 1].idcliente);
    
      return
     }
     setIdCliente(datos.res[0].idcliente);
      return          
    }
    setDatosc([])

  }

  const EditarMedida=(codigo)=>{
   if(datosdm.length > 0){
    for(let i in datosdm){
        if(Number(codigo) === Number(datosdm[i].iddetallem)){
            setfactor(datosdm[i].factor);
            setNombreMedidad(datosdm[i].nombre);
            setPrefijo(datosdm[i].prefijo);
            setcodPresentacion(datosdm[i].iddetallem)
        }
    }
  }
  }
  const EditarPrecio = (codigo) => {
    let newprecio=ObtenerPrecio(codigo)
    setidprecio(codigo)
    setprecio(newprecio)
  
  }
  const ObtenerPrecio = (codigo) => {
    if(datosp.length > 0){
      for(let i in datosp ){
        if(Number(datosp[i].idprecio )===Number( codigo)){
          
             return   (datosp[i].precio)
    
        }
      }
      }
  }

const ConsultaCategoria = async()=>{
  let newCat= await Datos.Consulta('categoria');
  if(typeof newCat !=='undefined'){
    setDatosCat(newCat.res)
    return
  }
  setDatosCat([])
  
}
const ConsultarPrecio = async(codigo)=>{
  let newpre= await Datos.ConsultaDetalleID('precio',codigo);
  console.log(newpre.res)
  if(typeof newpre !=='undefined'){
    setDatosp(newpre.res)
    return
  }
  setDatosp([])
  
}
const ConsultarDetalleM=async(codigo)=>{
  const info=await Datos.ConsultaDetalleID("detallemedida",codigo);
  console.log(info)
  if(typeof info !== 'undefined'){
      console.log(info.res);
    setDatosdm(info.res);

    return          
  }
  setDatosdm([])

}

  const BusquedaProducto = (text) => { 
   
    setBuscar(text);

    if(categoria !=="Todo"){
    setDatos(datosAux.filter((item)=>{
        return   item.descripcion.toLowerCase().includes(text.toLowerCase()) &&  item.categoria.toLowerCase().includes(categoria.toLowerCase());   
      }).map((element)=>{
        return element
      })
     );
     return
    }
    setDatos(datosAux.filter((item)=>{
      return   item.descripcion.toLowerCase().includes(text.toLowerCase()) ;   
    }).map((element)=>{
      return element
    })
   );
   }

 const FilatrarCategoria=(cat)=>{
setcategoria(cat);
if(cat !== "Todo"){
setDatos(datosAux.filter((item)=>{
return item.categoria.toLowerCase().includes(cat.toLowerCase());
}).map((element)=>{
  return element
})
);
return
}
setDatos(datosAux)
 }

   const calcDescuento= (cantidad) => {
    setDescuento(cantidad)
    if(cantidad > 0){
    setTotal(subtotal-cantidad) 
    }else{
        setTotal(subtotal)
    }

}





const existeProducto = (data) => {

if(detallefac.length > 0){
for (let i in detallefac){
if(detallefac[i].idproducto === data.idproducto && detallefac[i].idstock===data.idstock){
  console.log("encontrado")
  return true
}
}
}

}
const AgregarNuevo = (data,cant,precio) => {
let newItem={
idproducto:data.idproducto,
idmedida:data.idmedida,
factor:factor,
idstock:data.idstock,
descripcion:data.descripcion ,
cantidad:cant,
prefijo:data.prefijo,
precio: precio,  
total:Number(cant)*Number(data.precio), 


}
console.log(newItem)
let datosDeventas=returnDatosDeVenta(detallefac,newItem);  

setDetalleFac(datosDeventas);
console.log("agregado")
calcTotal(detallefac);
}

const returnDatosDeVenta = ( datosventa,newItem) => {
let dts=datosventa;
dts.push(newItem);
return dts;

}

const actualizarEncontrado = () => { 
for (let i in datos){
for(let j in datosAux){
if(datos[i].idproducto === datosAux[j].idproducto && datos[i].idstock === datosAux[i].idstock) {
datosAux[j].cantidad=datos[i].cantidad;

return
}

}
}
}

const verificarCantidad = (item,cantidad) => { 
  for(let i in datos){
    if(item.idproducto === datos[i].idproducto && item.idstock===datos[i].idstock){
      if(datos[i].cantidad >= cantidad){
        console.log("verificar cantidad")
        return cantidad
      }
      return datos[i].cantidad;
    }
  }
 }

const descontarCantidad  = (item,cantidad) => { 
for(let i in datos){
  if(datos[i].idproducto === item.idproducto && datos[i].idstock===item.idstock){
    let cantidaAnterior=datos[i].cantidad;
    datos[i].cantidad= cantidaAnterior-cantidad;
    console.log("Descontar")
    return
  }
}
 }

const ModificarExistente = (item,cantidad,precio) => {
  
  for(let i in detallefac){
    if(detallefac[i].idproducto === item.idproducto && detallefac[i].idstock === item.idstock){
     // detallefac[i].cantidad=Number(detallefac[i].cantidad) + Number(cantidad);
     detallefac[i].cantidad=Number(cantidad);
      detallefac[i].total=Number(precio) * Number(detallefac[i].cantidad)
      console.log("agregar a existente")
      setDetalleFac(detallefac=>[...detallefac])
      calcTotal(detallefac)
      return 
    }
  }
  
}

const devolverProducto = (data) => {

  for (let i in datos){
  if(datos[i].idproducto && data.idproducto && datos[i].idstock === data.idstock){
  datos[i].cantidad=(Number(datos[i].cantidad)+Number(data.cantidad));
  setDatos(datos => [...datos]);
  console.log("Producto devuelto")
  return true;
  }

  }
  
  }
  const ObtenerFila =  (pro) => {
   for(let i in detallefac){
    if(pro.idproducto === detallefac[i].idproducto && pro.idstock === detallefac[i].idstock){
      return detallefac[i]
    }
   }
  }

 const AgregarProducto = async  (item,cantidad,precio) => { 
  console.log(item)
if(!existeProducto(item)){
let newCantidad= await verificarCantidad(item,cantidad) 
 descontarCantidad(item,newCantidad);
  AgregarNuevo(item,newCantidad,precio)
  actualizarEncontrado();
  return
  
}

let newCantidad = await verificarCantidad(item,cantidad);
 descontarCantidad(item,newCantidad)
 ModificarExistente(item,newCantidad,precio);

  }

    const calcTotal=(data )=>{   
      let subtotal=0;
      for(let i in data){
      subtotal=Number(subtotal) + Number(data[i].total);
      }
      setSubtotal(subtotal);
      setTotal(subtotal);

    }






const Eliminar=(data)=>{   
  console.log(data) 
for(let i in detallefac){
  if(detallefac[i].idproducto === data.idproducto && detallefac[i].idstock===data.idstock){
    if(devolverProducto(data)){
      detallefac.splice(i,1)
      calcTotal(detallefac)
      setDetalleFac(detallefac=>[...detallefac])
      return
    }
  }
}
    }        
    
const detalleItem = (data,codigoFac) => {
let item={
iddetalle:0,
idfactura:codigoFac,
idproducto:data.idproducto,
cantidad:data.cantidad,
precio:data.precio,
total:data.total,
idstock:data.idstock

}

return item
}

async function vender(estado) {

  if(idcliente <= 0){
swal("Aviso","Seleccione o ingrese el cliente para poder continuar"+idcliente,"warning");
return
  }

if(detallefac.length >0){
let fact={
idfactura:0, 
idcliente: idcliente, 
idempleado:7,
fecha:moment(new Date()).format("YYYY-MM-YY"),
total:total,
estado: estado,
lugar: "tienda"
}

let ingresado=await Datos.NuevoReg("factura",fact);
if(typeof ingresado !== 'undefined'){
  setFacturaIngresado(ingresado.res[0].idfactura)
  let codfactura=ingresado.res[0].idfactura;
    await Promise.all(   
        detallefac.map(async (item) =>{
        let row=detalleItem(item,codfactura)
        console.log(row)
        let detalleIngresado=await Datos.NuevoReg("detallefactura",row);
        if(typeof detalleIngresado !== "undefined"){   
            swal("Aviso","Venta realizada, Haga clic en nueva venta","success")         
        }
    })
    )
//ImprimirFact(codfactura);
}

return
}
swal("Aviso", "Selecciona los productos para poder vender","warning");
}

const borraDatosVenta = () => {
detallefac.splice(0);
setDetalleFac(detallefac=>[...detallefac]);
setTotal("");
setSubtotal("")
setDescuento("")
setIdCliente(datosc[0].idcliente)
setRecibido("")
setFacturaIngresado("")
setEstado("Vendido")
}


const ImprimirFactura =  (fact) => {
  if(fact !== ""){
  printJS (`http://localhost:3002/facturapdf/viewone/${fact}`) 
  return
}
swal("Aviso","Para poder imprimir haga una venta. \n Si desea re-imprimir de una venta anterior ve a sección ventas", "warning")
}




const AgregaralaOrden = async(item,cantidad) => {
  await ConsultarDetalleM(item.idmedida);
  await ConsultarPrecio(item.idproducto);
  setCantidad(cantidad)
  setprecio(item.precio)
setProSeleccionado(item)
if(existeProducto(item))

{
  devolverProducto(ObtenerFila(item))
}

  let myModal=new bootstrap.Modal(document.getElementById("ModalCantidad"));
  myModal.show()
  
}


const EditarCantidad = async(item) => {
  devolverProducto(item)
  await ConsultarDetalleM(item.idmedida);
  await ConsultarPrecio(item.idproducto);
  setCantidad(item.cantidad / item.factor)
  setprecio(item.precio)
  setcodPresentacion(item.idmedida)
setProSeleccionado(item)
  let myModal=new bootstrap.Modal(document.getElementById("ModalCantidad"));
  myModal.show()
  
}
const ActualizarItemOrden =  () => {
  let precios=precio;
   AgregarProducto(proSeleccionado,cantfinal,precios)
  
}

//funcion para lector de codigo de barra
const CodigoBarra = (e) => {
 
  if(e.key === 'Enter'){
    let codigoproducto=e.target.value;
    console.log(codigoproducto)
    let item= GetProducto(codigoproducto);  
    if(item){
      AgregaralaOrden(item,1)
      setCodeBarr("")
      return
    }
    setCodeBarr("")
  }
}
const GetProducto = (codigobarra) => {
 if(datos.length >0) {
  for (let i in datos){
    if(datos[i].barrcode === codigobarra){
      return datos[i]
    }
  }
 }
}
  return (
    <div >
    <div  className='row div-venta'  id='div-venta'>
        <div className='col-6  col-sm-12 col-md-6 div-venta-left'>  
<div className='div-header-sale'>
<label className='title-orden'>Catalogo</label>
<div className='row'>
  <div className='col-6 col-md-6 col-sm-6' >
     <InputSearch
        value={buscar}
        placeholder="Buscar..."
        onChange={BusquedaProducto}
        />
  </div>
  <div className='col-5 col-md-5 col-sm-5' >
  <div className="input-group input-group-sm ">
  <span className='input-group-text'  id='basic-addon1' > <i className=" fa-solid fa-barcode"></i></span>
  <input type="text" id='barCode' className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  value={CodeBarr} onChange={(e)=>setCodeBarr(e.target.value)} onKeyDown={(e)=>CodigoBarra(e)} />
</div>
  </div>
   
       
</div>
      
   </div>
       <div className='div-body-sale'>
 
        <div className="table-wrap-venta">
          <div className='container-pro'>
        {datos.length > 0 ? 
        datos.map((item, index)=>(
            <CardProducto 
            key={index}
          
            Item={item}
            Cantidad={1}
            onClick={AgregaralaOrden}
            Url={`${urlImg}${item.imagen}`}
            Title={item.descripcion}
            Precio={ConvertirAMoneda(item.precio) + '  /' +item.prefijo }
            Disponible={"Disp.: "+item.cantidad+ " / "+item.prefijo }

          />
        )
        
        )
        : <Loader/>}
        </div>

     </div>
         </div>
                <div className='div-footer-sale.'>
                <div className='row ps-3 pe-3 mt-1'>
          <span>Categorias:</span>
          <div className='d-flex flex-row justify-content-left align-items-center mt-1 overflow-x-scroll  row-categoria'>
         
{datoscat.length > 0 ? 
datoscat.map((item,index)=>(
<button key={index}  className={item.nombre === categoria ? "opt-categoria cat-active": "opt-categoria "} onClick={()=>FilatrarCategoria(item.nombre)}>{item.nombre}</button>
))
: null

}
 </div>
         </div>
         <div className='p-1 d-flex justify-content-end align-items-center'>
         <button  className={categoria ==="Todo" ? "opt-categoria cat-active ": "opt-categoria "} onClick={()=>FilatrarCategoria("Todo")}>Todo</button>
      </div>
                </div>
        </div>
 


        <div className='col-6  col-sm-12 col-md-6'> 
        <div className='div-header-sale-right'>
        
   <label className='title-orden'> Productos de la orden </label> 
  </div>
               
  <div className='div-body-sale-right'>
    {detallefac.length > 0 ? 
    <ContainTable>
      <HeaderTable>
      <th>Descripcion</th>
      <th>Cant</th>          
      <th>Precio/u</th>    
      <th>total</th>
      <th></th>
      </HeaderTable>
      <BodyTable>
        {
          detallefac.map((item,index) =>(
            <tr key={index}>
             <td  onClick={()=>EditarCantidad(item)}>{item.descripcion}</td>
              <td>{item.cantidad + " "+item.prefijo}</td>
              <td>{ConvertirAMoneda(item.precio) }</td>              
              <td>{ConvertirAMoneda(item.total) }</td>
              <ButtonOptions item={item} Eliminar={Eliminar} />
             
             </tr>
           ))
        }
      </BodyTable>
    </ContainTable> 
    : <div>
      <h6>¡Aún no hay producto seleccionado!</h6>
      </div>}
 
               </div>

<div className='div-footer-sale-right'>

<div className="input-group input-group-sm  mb-1 mt-1">

<label  className="input-group-text"  htmlFor="inputGroupSelect01"  id="inputGroup-sizing-sm">Cliente:</label>
 <select className="form-select form-select-sm  " id="inputGroupSelect01" data-live-search="true" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={idcliente} onChange={(e)=>{setIdCliente(e.target.value)}}>
                         <option key={0} value={0} >Seleccione el cliente</option>
                         {datosc ? datosc.map((item,index) =>(
                         <option key={index} value={item.idcliente} data-tokens={item.nombre} >{item.nombre + " "+ item.apellido}</option>))
                         :
                        null
                          }
                    </select>
                    <button  className="input-group-text "  htmlFor="inputGroupSelect01" data-bs-toggle="modal" data-bs-target="#exampleModal" id="inputGroup-sizing-sm" onClick={()=>setnewClient(true)}><i className='fa-solid fa-circle-plus icon-add'></i></button>
</div>
        
  <div className="input-group form-control-sm">

  <input type="text" className="form-control form-control-sm  col-6 col-sm-6 col-md-6 col-lg-6" htmlFor="form1Example1" value="Total:" disabled />
        <input type="text" id="form1Example1" className="form-control form-control-sm  col-6 col-sm-6 col-md-6 col-lg-6" value={ConvertirAMoneda(total)}  readOnly/>
      
  </div>
  <div className="input-group form-control-sm ">

<input type="text" className="form-control form-control-sm  col-6 col-sm-6 col-md-6 col-lg-6" htmlFor="form1Example1" value="Recibido: " disabled />
 <input type="number" id="form1Example1" className="form-control form-control-sm  col-6 col-sm-6 col-md-6 col-lg-6" value={recibido}  onChange={(e) =>setRecibido(e.target.value)} required/>

</div>
<div className="input-group form-control-sm  ">

<input type="text" className="form-control form-control-sm  col-6 col-sm-6 col-md-6 col-lg-6" htmlFor="form1Example1" value="Cambio:" disabled />
 <input type="text" id="form1Example1" className="form-control form-control-sm  col-6 col-sm-6 col-md-6 col-lg-6"  value={ConvertirAMoneda(cambio)} readOnly/>

</div>
<div className='d-flex  justify-content-center align-items-center mb-1'>
<button className='btn btn-primary btn-sm w-50' onClick={()=>vender("Vendido")}> Vender</button>
</div>

<div className=' d-flex flex-row justify-content-center align-items-center'>
<button className='btn btn-outline-primary btn-sm w-40' onClick={()=>borraDatosVenta()}> Nueva Venta</button>
<button onClick={()=>ImprimirFactura (facturaingresado)} className='btn btn-outline-primary btn-sm w-40 ms-3'  > Imprimir boucher</button>
</div>

</div>

        </div>
   
    </div>
   
  
<div className="modal fade" id="ModalCantidad" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content  ">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Producto</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Presentación</label>
      <div className="col-9">  

                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={codPresentacion} onChange={(e)=>EditarMedida(e.target.value)}>
                  <option value={0} >-- Seleccionar --</option>
                         {datosdm ? datosdm.map((item,index) =>(
                         <option key={index} value={item.iddetallem} data-tokens={item.nombre}>{item.nombre }</option>))
                         :
                        null
                          }
                    </select>
              </div> 
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Cantidad</label>
      <input type="text" id="form1Example1" className="form-control" value={cantidad}  onChange={(e) => setCantidad(e.target.value)} required />      
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Cantidad en {prefijo}</label>
      <label type="text" id="form1Example1" className="form-control" >{`${cantfinal} / ${prefijo}`}</label>      
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Precios sugerido</label>
      <div className="col-9">  

                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idprecio} onChange={(e)=>EditarPrecio(e.target.value)}>
                  <option value={0} >-- Seleccionar --</option>
                         {datosp ? datosp.map((item,index) =>(
                         <option key={index} value={item.idprecio} data-tokens={item.nombre}>{item.nombre + " "+ ConvertirAMoneda(item.precio)+ "/"+ item.prefijo}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Precio por: {prefijo}</label>
      <input type="text" id="form1Example1" className="form-control" value={precio}  onChange={(e) => setprecio(e.target.value)} required />      
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
        <button type="button" className="btn btn-primary"  onClick={ActualizarItemOrden} >Aceptar</button>
      </div>
    </div>
  </div>
</div>
 {/** inicio del modal de ingreso cliente */}
 <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={true}
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            {newClient ? 
              <FormCliente
                Item={null}
                ConsultarCliente={ConsultarCliente}
              />
             : null}
          </div>
        </div>
      </div>
      {/** fin del modal de ingreso cliente */}
    </div>
  )
}

export default Venta