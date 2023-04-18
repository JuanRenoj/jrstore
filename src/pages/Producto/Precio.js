import React, {useEffect, useState}from 'react'

import Datos from '../../services/Datos';
import swal from "sweetalert";
import InputSearch from '../../Components/InputSearch';
import { ConvertirAMoneda } from '../../utils/Funciones';
import IconSort from '../../Components/Buttons/IconSort';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
function Precio() {
    const [buscar, setBuscar] = useState("")
    const [buscarprecio, setBuscarprecio] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [datosc,setDatosc]=useState([]);
    const [datosp,setDatosp]=useState([]);
    const [datosAuxp, setDatosAuxp]=useState([]);
    const [datosdm, setDatosdm]=useState([]);
    const [medida, setMedida]=useState("");

    const [idprecio, setIdPrecio] = useState("");
    const [idproducto, setIdProducto] = useState("");   
    const [iddetallem, setIdDetallem] = useState("");
     const [nombre, setNombre] = useState("");   
     const [precio, setPrecio] = useState(""); 
     const [productSelected, setproductSelected] = useState([])
     

    const [accion, setAccion] = useState("new");

 
   
    
    const [estado, setEstado] = useState("");

    const [sort, setSort]=useState("ASC")
useEffect(()=>{
 // ConsultaProducto()
CosultaPrecio();

},[])
/*
const ConsultaProducto=async()=>{
  const datos=await Datos.Consulta("Producto");
  console.log(datos)
  if(typeof datos !== 'undefined'){
     console.log(datos.res);
    setDatosp(datos.res);
    setDatosAuxp(datos.res)   
    return          
  }
  setDatosp([])
  setDatosAuxp([])
}
*/

    const CosultaPrecio=async()=>{
        const datos=await Datos.Consulta("precio");
        console.log(datos)
        if(typeof datos !== 'undefined'){
           console.log(datos.res);
          setDatos(datos.res);
          setDatosAux(datos.res)   
          return          
        }
        setDatos([])
        setDatosAux([])
      }
      const GetPrecio=async(item)=>{
setproductSelected(item)
        const datos=await Datos.ConsultaDetalleID("precio",item.idproducto);
        console.log(datos)
        if(typeof datos !== 'undefined'){
           console.log(datos.res);
          setDatosp(datos.res);
          setDatosAuxp(datos.res)   
          return          
        }
        setDatosp([])
        setDatosAuxp([])
      }

      const ConsultaMedida=async(codigo)=>{
        const datos=await Datos.ConsultaDetalleID("detallemedida",codigo);
        console.log(datos)
        if(typeof datos !== 'undefined'){
           console.log(datos.res);
          setDatosdm(datos.res);
      
          return          
        }
        setDatosdm([])
  
      }


      const limpiar=()=>{
        setIdPrecio(0);        
        setIdProducto("");
        setPrecio("");
        setIdDetallem("");
        setNombre("");     
     setAccion("new")
      }
      const returnDatosCliente = (codigo) => { 
      
        return { idprecio:codigo,
            idproducto:idproducto,
           iddetallem:iddetallem,
            precio:precio,
            nombre:nombre
        }
       }
      const Ingresar=async()=>{   
        let precio=await Datos.NuevoReg("precio",returnDatosCliente(0));
        if(typeof precio !== 'undefined'){
      swal("Precio","Ingresado exitosamente","success");
           limpiar();
            CosultaPrecio();
          }
      }
      const Actualizar=async()=>{  
        let precio=await Datos.ActualizarReg("precio",returnDatosCliente(idprecio));
        if(typeof precio !== 'undefined'){    
            swal("Precio","Actualizado exitosamente","success");
            CosultaPrecio();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let precio=await Datos.BorrarReg("precio",datos.idprecio);
        if(typeof precio!=="undefined"){
            swal("Precio", "Eliminado con exíto","success")         
            CosultaPrecio();
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

      const AgregarItem=(item )=>{
        setIdPrecio(0)
        setIdProducto(item.idproducto);
        setMedida(item.idmedida);
        setAccion("new")
        ConsultaMedida(item.idmedida)
      }
      const AbrirActualizar=(datos,e)=>{
  setIdPrecio(datos.idprecio);
  setIdProducto(datos.idproducto);
  setIdDetallem(datos.iddetallem);
  setPrecio(datos.precio);
  setNombre(datos.nombre);
 
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{    
        setBuscar(text);        
        setDatos(datosAux.filter((item)=>{
            return   item.nombre.toLowerCase().includes(text.toLowerCase()) ;   
          }).map((element)=>{
            return element
          })
         );
        
          }
          const BusquedaPrecio =(text)=>{    
            setBuscarprecio(text);        
            setDatosp(datosAuxp.filter((item)=>{
                return   item.nombre.toLowerCase().includes(text.toLowerCase()) ;   
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
       
          if(sort === "ASC"){
           let newDatos= [...datos].sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 );
            setDatos(newDatos )
            setSort("DESC")
            return
          }
          let newDatos= [...datos].sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 );
          setDatos(newDatos )
          setSort("ASC")
          
          
         }
         const sortItem2 = (col) => { 
       
          if(sort === "ASC"){
           let newDatos= [...datosp].sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 );
            setDatosp(newDatos )
            setSort("DESC")
            return
          }
          let newDatos= [...datosp].sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 );
          setDatosp(newDatos )
          setSort("ASC")
          
          
         }
         const Agregar = (item,e) => {
          AgregarItem(item);
          AbrirIngreso(e)
         }

  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12 col-lg-6 '>
           
    <div className='div-header'>
    <label className='title-orden mt-3'>Lista de producto</label>
      <div className='row mt-3'>
        <InputSearch
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar producto..."            
            />
       </div>
      
       
    </div>
    <div className='div-body'>
{datos.length >0 ? 
<ContainTable>
  <HeaderTable>
  <th onClick={()=>sortItem("nombre")} ><IconSort col={"Producto"}/> </th>
  <th>Precio</th>                
  <th>Opciones</th>
  </HeaderTable>
  <BodyTable>{
    datos.map((item,index) =>(
      <tr key={index}>
         <td >{item.nombre}</td>
         <td>{item.precio ? <i className="fa-solid fa-circle-check icon-check"></i> : null }</td>
         <ButtonOptions item={item} Agregar={Agregar}  VerDetalle={GetPrecio}/>        
       </tr>
     )) 
    }
  </BodyTable>
</ContainTable>
:<Loader/>}
      </div> 
      </div>
      <div className='col-md-6 col-sm-12 col-lg-6 '>
    
      <div className='div-header'>
    <label className='title-orden mt-3'>Precio del producto: {typeof productSelected.nombre !=='undefined' ? productSelected.nombre: "" }</label>
      <div className='row mt-3'>
        <InputSearch
            onChange={BusquedaPrecio} 
            value={buscarprecio} 
            placeholder="Buscar precio..."            
            />
       </div>
       
       
    </div>
    <div className='div-body'>
      {datosp.length >0 ?
      <ContainTable>
        <HeaderTable>
        <th onClick={()=>sortItem2("nombre")}><IconSort col="Nombre" /></th>
        <th>Precio</th>   
        <th>Opciones</th>
        </HeaderTable>
        <BodyTable>
          { datosp.map((item,index) =>(
            <tr key={index}>  
               <td>{item.nombre}</td>
               <td>{ConvertirAMoneda((item.precio * item.factor))+ "   ("+ ConvertirAMoneda( item.precio) +" / "+item.prefijo + ")"}</td>
               <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar} />                         
             </tr>
           )) 
          }
        </BodyTable>
      </ContainTable>
      :
    null
      }

      </div>
      </div>

     
    
         
{/**modal para ingreso de precio */}

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
        <h5 className="modal-title">Ingreso de Precio</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idprecio} onChange={(e) => setIdPrecio(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Medida</label>
      <div className="col-9">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={iddetallem} onChange={(e)=>setIdDetallem(e.target.value)}>
                    <option value={0} >Selecionar</option>
                         {datosdm ? datosdm.map((item,index) =>(
                         <option key={index} value={item.iddetallem} data-tokens={item.nombre}>{item.nombre}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
  </div>
 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} required />
         
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio (u)</label>
        <input type="number" id="form1Example1" className="form-control" value={precio}  onChange={(e) => setPrecio(e.target.value)} required/>
  </div>
 
 
 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso precio */}

    </div>
  )
}

export default Precio