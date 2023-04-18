import React, {useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import swal from "sweetalert";
import { ConvertirAMoneda } from '../../utils/Funciones';
import moment from 'moment/moment';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import IconSort from '../../Components/Buttons/IconSort';
function Compras() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idstock, setIdStock] = useState("");
    const [idproducto, setIDProducto] = useState("");   
    const [idproveedor, setIdProveedor] = useState("");
     const [detallemedida, setDetallemedida] = useState("");   
     const [idubicacion, setIdUbicacion] = useState(""); 
    const [cantidad, setCantidad] = useState(""); 
    const[nombremedida,setNombreMedidad]=useState("");
  
  
 const [precio_compra, setPrecio_compra] = useState("");
   const [accion, setAccion] = useState("new");
   
   const [datosu, setDatosu]=useState([]);
   const [datosdm, setDatosdm]=useState([]);
   const [datosm, setDatosm]=useState([]);
   const [datosp, setDatosp]=useState([]);
   const [datospro, setDatospro]=useState([]);
    const[factor,setfactor]=useState("");
    const cantfinal =(factor * cantidad).toFixed(2);
    const[abrevfactor, setAbrevfactor]=useState("");

    const [sort, setSort]=useState("ASC")
useEffect(()=>{
ConsultarStock();
ConsultarProducto();
ConsutarProveedor();
ConsultarUbicacion();


},[])


    const ConsultarStock=async()=>{
        const datoss=await Datos.Consulta("stock");
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
      const ConsultarUbicacion=async()=>{
        const datoss=await Datos.Consulta("ubicacion");
        console.log(datoss)
        if(typeof datoss !== 'undefined'){
            console.log(datoss.res);
          setDatosu(datoss.res);
   
          return          
        }
        setDatosu([])
      
      }
      const ConsultarProducto=async()=>{
        const datoss=await Datos.Consulta("producto");
        console.log(datoss)
        if(typeof datoss !== 'undefined'){
            console.log(datoss.res);
          setDatosp(datoss.res);
        
          return          
        }
        setDatosp([])
      
      }
      const ConsutarProveedor=async()=>{
        const datoss=await Datos.Consulta("proveedor");
        console.log(datoss)
        if(typeof datoss !== 'undefined'){
            console.log(datoss.res);
          setDatospro(datoss.res);
   
          return          
        }
        setDatospro([])
      
      }
const ProductoSeleccionado = (codigo) => {
  setIDProducto(codigo);
  ConsultarDetalleM(codigo);
  getPrefijo(codigo)
}

      const ConsultarMedida=async()=>{
        const info=await Datos.Consulta("medida");
        console.log(info)
        if(typeof info !== 'undefined'){
            console.log(info.res);
          setDatosm(info.res);

          return          
        }
        setDatosm([])
  
      }

      const getPrefijo = (codigo) => {
        for( let i  in datosp){
          if(Number(codigo) === Number(datosp[i].idproducto)){
            setAbrevfactor(datosp[i].prefijo)
            return
          }
        }
      }

      const returnFactor=(codigo)=>{
        for(let i in datosdm){
            if(Number(codigo) === Number(datosdm[i].iddetallem)){
                setfactor(datosdm[i].factor);
                setNombreMedidad(datosdm[i].nombre);
               // setAbrevfactor(datosdm[i].prefijo);
                
            }
        }

      }

      const returnMedida = (codigo) => { 
      
        for(let i in datosp){
        
            if(Number(codigo) === Number(datosp[i].idproducto)){
              
                return datosp[i]
            }
        }
       }
      const ConsultarDetalleM=async(codigo)=>{
    
        const info=await Datos.ConsultaDetalleID("detallemedida",returnMedida(codigo).idmedida);
        console.log(info)
        if(typeof info !== 'undefined'){
            console.log(info.res);
          setDatosdm(info.res);
     
          return          
        }
        setDatosdm([])
      
      }


      const limpiar=()=>{
        setIdStock(0);        
        setIDProducto("");
        setIdUbicacion("");
        setIdProveedor("");
        setDetallemedida("");  
        setIdUbicacion("")   ;
        setPrecio_compra("");
        setCantidad("");
        setAccion("new")
      }
      const returnDatosProducto = (codigo) => { 
      
        return { 
            idstock:codigo,
            idproducto:idproducto,
           idproveedor:idproveedor,
            idubicacion:idubicacion,
            detallemedida:detallemedida,
           precio_compra:precio_compra,
           cantidad:cantfinal,
        }
       }
      const Ingresar=async()=>{   
        let cliente=await Datos.NuevoReg("stock",returnDatosProducto(0));
        if(typeof cliente !== 'undefined'){
      swal("Compras","Ingresado exitosamente","success");
           limpiar();
            ConsultarStock();
          }
      }
      const Actualizar=async()=>{  
        let cliente=await Datos.ActualizarReg("stock",returnDatosProducto(idstock));
        if(typeof cliente !== 'undefined'){    
            swal("Compras","Actualizado exitosamente","success");
            ConsultarStock();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let cliente=await Datos.BorrarReg("stock",datos.idstock);
        if(typeof cliente!=="undefined"){
            swal("Compras", "Eliminado con exíto","success")         
            ConsultarStock();
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
  setIdStock(datos.idstock);
  setIDProducto(datos.idproducto);
  setIdProveedor(datos.idproveedor);
  setIdUbicacion(datos.idubicacion);
  setDetallemedida(datos.detallemedida);
  setPrecio_compra(datos.precio_compra);
  setCantidad(datos.cantidad)
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{
        
        setBuscar(text);
        
        setDatos(datosAux.filter((item)=>{
            return   item.descripcion.toLowerCase().includes(text.toLowerCase()) ;   
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
           // let newDatos= datosAux.sort((a,b)=>a[col].toLowerCase() > b[col].toLowerCase ? 1 : -1)
            setDatos(datosAux.sort((a,b)=>a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1))
            setSort("DESC")
            return
          }
          setDatos(datosAux.sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1))
          setSort("ASC");
          return
          
         }

  return (
    <>
    <div className='div-header'>
    <label className='title-orden mt-3'>Compras</label>
      <div className='row mt-3'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Compras..."  

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
            <th onClick={()=>sortItem("descripcion")}><IconSort col="Descripción"/></th>
            <th>Ingreso</th>
            <th onClick={()=>sortItem("proveedor")}><IconSort col="Proveedor"/></th>
            <th>Comprado por</th>
            <th onClick={()=>sortItem("ubicacion")}><IconSort col="Ubicación" /></th>
            <th>Cantidad (u)</th>  
            <th>Precio de Compra</th>         
            <th>Opciones</th>
      </HeaderTable>
      <BodyTable>
        {datos.map((item, index)=>(
          <tr key={index}>
               <td>{item.descripcion}</td>
               <td>{moment(item.fecha_ingreso).format("DD-MM-YYYY") }</td>
               <td>{item.proveedor}</td>
               <td>{Math.round( item.unidadmayor) +" "+ item.nommayor }</td>
               <td>{item.ubicacion}</td>
               <td>{item.cantidad +" " + item.prefijo}</td>
               <td>{ConvertirAMoneda(item.precio_compra)  +"  " + item.prefijo}</td>   
               <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar} />       
          </tr>
        ))}
      </BodyTable>
      </ContainTable>
      :
      <Loader/>

      }
      </div>
     
    
         
{/**modal para ingreso de cliente */}

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
        <h5 className="modal-title">Ingreso de Compras</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-0">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idstock} onChange={(e) => setIdStock(e.target.value)} />

  </div>
 
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1">Producto</label>
      <div className="col-9">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idproducto} onChange={(e)=>ProductoSeleccionado(e.target.value)}>
                  <option key={0} value={0} >Seleccione el producto</option>
                         {datosp ? datosp.map((item,index) =>(
                         <option key={index} value={item.idproducto} data-tokens={item.descripcion}>{item.descripcion}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
        
  </div>
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Proveedor</label>
      <div className="col-9">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idproveedor} onChange={(e)=>setIdProveedor(e.target.value)}>
                  <option key={0} value={0} >Seleccione el Proveedor</option>
                         {datospro ? datospro.map((item,index) =>(
                         <option key={index} value={item.idproveedor} data-tokens={item.nombre}>{item.nombre}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
       
  </div> 
  
  <div className="form-outline mb-2">
      <label className="form-label" htmlFor="form1Example1" >Comprado por {`(Seleccione primero el producto)`}</label>
      <div className="col-9">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={detallemedida} onChange={(e)=>{setDetallemedida(e.target.value);returnFactor(e.target.value)}}>
                         <option key={0} value={0} >Seleccione la medida</option>
                         {datosdm ? datosdm.map((item,index) =>(
                         <option key={index} value={item.iddetallem} data-tokens={item.nombre} >{item.nombre}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
      
  </div>
  <div className="form-outline mb-2">
       <label className="form-label" htmlFor="form1Example1" >Ubicacion</label>
       <div className="col-9">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idubicacion} onChange={(e)=>setIdUbicacion(e.target.value)}>
                  <option key={0} value={0} >Seleccione la ubicación</option>
                         {datosu ? datosu.map((item,index) =>(
                         <option key={index} value={item.idubicacion} data-tokens={item.nombre}>{item.nombre}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
       
  </div>
  <div className="form-outline mb-2">
       <label className="form-label" htmlFor="form1Example1" >Precio de compra {`(c/${abrevfactor})`}</label>
        <input type="number" id="form1Example1" className="form-control" value={precio_compra}  onChange={(e) => setPrecio_compra(e.target.value)} required/>
  </div>
  <div className="form-outline mb-2">
       <label className="form-label" htmlFor="form1Example1" >Cantidad de {nombremedida}</label>
        <input type="number" id="form1Example1" className="form-control" value={cantidad}  onChange={(e) =>setCantidad(e.target.value)} required/>
  </div>
  <div className="form-outline mb-2">
       <label className="form-label" htmlFor="form1Example1" >Cantidad total: {`  ${cantfinal}  ${abrevfactor}:`} </label>
       
  </div>
 
 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso cliente */}

    </>
  )
}

export default Compras