import React, { useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import { ItemProducto } from '../../Context/Context';
import swal from "sweetalert";
import DetalleProducto from './DetalleProducto.js';
import {urlImg} from '../../services/Host';
import Estado from '../../Components/Estado';
import IconSort from '../../Components/Buttons/IconSort';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import InputText from '../../Components/inputs/InputText';
import InputBarrCode from '../../Components/inputs/InputBarrCode';
import InputMoney from '../../Components/inputs/InputMoney';
import InputSelect from '../../Components/inputs/InputSelect';
import { adpater_categoria, getNameCategoria } from '../../adapters/adapter_categoria';
import InputState from '../../Components/inputs/InputState';
import { adapter_medida } from '../../adapters/adapter_medida';
import DropDown from '../../Components/DropDown';


function Producto() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idproducto, setIdProducto] = useState("");
    const [barrcode, setBarrCode] =useState("");
    const [idmedida, setIdMedida] = useState("");   
    const [idcategoria, setIdCategoria] = useState("");
     const [descripcion, setDescripcion] = useState("");   
     const [cant_max, setCant_max] = useState("");
     const [cant_min, setCant_min] = useState("");   
     const [imagen, setImagen] = useState("");
     const [previewImage, setPreviewImage] = useState("");
     const [buscarCategoria, setBuscarCategoria] =useState("")
     const [listCategoria, setListCategoria] = useState([]);
    const [msgError,setMsgError]=useState("")
   
     const [estado, setEstado] = useState("Activo");   
   const[imgAnterior,setImgAnterior]=useState("");
    const [accion, setAccion] = useState("new");
    const [datosc, setDatosc]=useState([]);
    const [datoscAux, setDatoscAux]=useState([]);
    const [datosm, setDatosm]=useState([]);
 
    const [sort, setSort]=useState("ASC")
    const[productoSelected, setProductoSelected]=useState();
    const[verDetalle, setVerDetalle]=useState();
    const [categoria,setCategoria]=useState("Todo");
    

 /*  const{
    medidaSelected,
    setMedidaSelected,
    setVerDetalle,
    verDetalle,
    ConsultarMedida
   }=useContext(ItemProducto);*/
    
   

  
useEffect(()=>{

ConsultaProducto();
getCategoria();
getMedidas();
EnfocarCodigoBarra();
},[])

const EnfocarCodigoBarra = () => {
  document.getElementById("barrCode").focus()
  
}
const getMedidas=async()=>{
    const datosM=await Datos.Consulta("medida");
    console.log(datosM)
    if(typeof datosM !== 'undefined'){
       console.log(datosM.res);
      setDatosm(datosM.res);

      return          
    }
    setDatosm([])
  
  }
  const getCategoria=async()=>{
    const datosC=await Datos.Consulta("categoria");
    console.log(datosC)
    if(typeof datosC !== 'undefined'){
       console.log(datosC.res);
      setListCategoria(datosC.res)
      setDatosc(datosC.res);
      setDatoscAux(datosC.res)
   
      return          
    }
     setListCategoria([])
    setDatosc([])
    setDatoscAux([])
   
  
  }

    const ConsultaProducto=async()=>{
        const datosP=await Datos.Consulta("producto");
        console.log(datosP)
        if(typeof datosP !== 'undefined'){
           console.log(datosP.res);
          setDatos(datosP.res);
          setDatosAux(datosP.res)   
          return          
        }

        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdProducto(0);        
        setIdMedida("");     
        setIdCategoria("");
        setDescripcion("");     
        setCant_max("");
        setCant_min("");
        setImagen("");
        setPreviewImage("")
        setImgAnterior("")
        setEstado("Activo");
        setBarrCode("")
        setAccion("new");
      }
      const returnDatosCliente = (codigo, nameImage) => { 
    
        return { 
            idproducto:codigo,
            barrcode:barrcode,
            idmedida:idmedida,
            idcategoria:idcategoria,
            descripcion:descripcion,
            cant_max:cant_max,
            cant_min:cant_min,
            imagen:nameImage,
            estado:estado,
        }
       }
      const Ingresar=async()=>{   
          const newImage= imagen;
          
        let producto=await Datos.NuevoReg("producto",returnDatosCliente(0,newImage.name));
        if(typeof producto !== 'undefined'){
          await  SubirImagen(newImage)
      swal("Producto","Ingresado exitosamente","success");
        
            ConsultaProducto();
               limpiar();
          }
      }
      const Actualizar=async()=>{  
        const newImage=imagen;

        let nomImagen=imagen === imgAnterior ? imagen : imagen.name;
        console.log(newImage)
        let producto=await Datos.ActualizarReg("producto",returnDatosCliente(idproducto,nomImagen));
        if(typeof producto !== 'undefined'){   
           await ActualizarImagen(newImage) 
            swal("Producto","Actualizado exitosamente","success");
            await ConsultaProducto();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let producto=await Datos.BorrarReg("producto",datos.idproducto);
        if(typeof producto!=="undefined"){
                    // await   BorrarImage(datos.imagen);
              
           await ConsultaProducto(); 
            swal("Producto", "Eliminado con exíto","success")     
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
  setIdProducto(datos.idproducto);
  setBarrCode(datos.barrcode)
  setIdMedida(datos.idmedida);
  setIdCategoria(datos.idcategoria);
  setDescripcion(datos.descripcion);
  setCant_max(datos.cant_max);
  setCant_min(datos.cant_min);
  setImagen(datos.imagen);
  setImgAnterior(datos.imagen);
setPreviewImage(`${urlImg}${datos.imagen}`)
  setEstado(datos.estado)
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{
   
        setBuscar(text);
        //let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
      
     

        if(categoria !=="Todo"){
        setDatos(datosAux.filter((item)=>{
            return   item.descripcion.toLowerCase().includes(text.toLocaleLowerCase) && item.categoria.toLowerCase().includes(categoria.toLocaleLowerCase());   
          }).map((element)=>{
            return element
          })
         );
         return
        }
        
        setDatos(datosAux.filter((item)=>{
          return   item.descripcion.toLowerCase().includes(text.toLowerCase());   
        }).map((element)=>{
          return element
        })

       );
          }
          const AbrirIngreso=(e)=>{
            limpiar();
            let myInput = document.getElementById("exampleModal");
            e.target.addEventListener("shown.bs.modal", function () {
              myInput.focus();
            });
          }

          const verificarCodigoExistente = (e) => {
            if(e.key === "Enter"){
              e.preventDefault()
            if(datosAux.length>0){
              for(let i in datosAux){
                console.log(barrcode)
                if(datosAux[i].barrcode === barrcode){
    
                  setMsgError(`El código de barra ${barrcode} ya existe. Ingrese otro.!`);
                  setBarrCode("")
                  EnfocarCodigoBarra()
                  return
                }
             
              }
             
             // setBarrCode(codigo)
             setMsgError("")
                return
            }
            setMsgError("")
           // setBarrCode(codigo)
          }
               
          }

        const sortItem = (col) => { 
          if(sort === "ASC"){
            const sorted=[...datos].sort((a,b)=>
              a[col].toLowerCase() > b[col].toLowerCase()  ? 1 : -1  );
            setDatos(sorted);
            setSort("DESC");
            return
          }
          const sorted=[...datos].sort((a,b)=>
          a[col].toLowerCase() < b[col].toLowerCase()  ? 1 : -1);
        setDatos(sorted);
        setSort("ASC");
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
          
          if(imgAnterior !== img){
            SubirImagen(img)
            BorrarImage(imgAnterior)

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
          const FiltrarCategoria = (cat) => {
            setCategoria(cat);
            if(cat !=="Todo"){
            let dat=datosAux.filter((item)=>{
              return item.categoria.toLowerCase().includes(cat.toLowerCase());
            }).map((row)=>{
              return row;
            });
            setDatos(dat)
            return
          }
          setDatos(datosAux);
          }
           
          const BuscarCategoria = (e) => {
            let text=e.target.value;
            setBuscarCategoria(text)      
            setListCategoria(datoscAux.filter((item)=>{
              return item.nombre.toLowerCase().includes(text.toLowerCase())
            }).map((element)=>{return element})
            )
            
          }


          const valueProvider={
            productoSelected,
            setProductoSelected,
            verDetalle,
            setVerDetalle,
            ConsultaProducto
          }


  return (
    <ItemProducto.Provider value={valueProvider}>
      { !verDetalle ?
       <div>
    <div className='div-header'>
    <label>Producto </label>
      <div className='row mt-1'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Detalle..." 
        

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
       </div>
        <div className='row ps-3 pe-3 mt-1'>
          <span>Categorias:</span>
          <div className='d-flex flex-row justify-content-left align-items-center mt-1 overflow-x-scroll  row-categoria'>
          <button  className={categoria ==="Todo" ? "opt-categoria cat-active": "opt-categoria "} onClick={()=>FiltrarCategoria("Todo")}>Todo</button>
{datosc.length > 0 ? 
datosc.map((item,index)=>(
<button key={index}  className={item.nombre === categoria ? "opt-categoria cat-active": "opt-categoria "} onClick={()=>FiltrarCategoria(item.nombre)}>{item.nombre}</button>
))
: null

}

          </div>
         </div>
       
    </div>
    <div className='div-body'>
{datos.length > 0 ? 
<ContainTable>
  <HeaderTable>
  <th onClick={()=>sortItem("descripcion")}><IconSort col={"Descripción"} /></th>
            <th onClick={()=>sortItem("medida")}><IconSort col={"Medida"}/></th>
            <th onClick={()=>sortItem("categoria")}><IconSort col={"Categoria"}/></th>
            <th>Imagen </th>
            <th onClick={()=>sortItem("estado")}><IconSort col={"Estado"}/></th>
              
            <th>Opciones</th>
  </HeaderTable>  
  <BodyTable>
      {
        datos.map((item,index) =>(
          <tr key={index}>
          
      
             
             <td>{item.descripcion}</td>
             <td>{item.medida}</td>
             <td>{item.categoria}</td>
             <td><img src={`${urlImg}${item.imagen}`} alt="img" style={{width:30, height: 25}} /> </td>
             <td><Estado estado={item.estado}/> </td>
             <ButtonOptions 
             item={item}
             Eliminar={Eliminar}
             Actualizar={AbrirActualizar}
             />
           
           </tr>
         ))  
      }
    </BodyTable>
</ContainTable>
: <Loader/>}


      </div>
     
    
         
{/**modal para ingreso de producto */}

  <form
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
          onSubmit={(e)=>{GuardarCambios(e)}}
          
        >
  <div className="modal-dialog modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso  Producto</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {/**      
      <div className="form-outline mb-3">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproducto} onChange={(e) => setIdProducto(e.target.value)} />

  </div>

  <div className="form-outline mb-3">
   
         <label className="form-label" htmlFor="form1Example1"  >Codigo de barra</label>   
    <input type="text" id="barrCode" className="form-control" value={barrcode} onChange={(e) => verificarCodigoExistente(e.target.value)} />
    <div className="input-group input-group-sm ">
  <span className='input-group-text'  id='basic-addon1' > <i className=" fa-solid fa-barcode"></i></span>
  <input type="text" id='barCode' className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  value={barrcode} onChange={(e)=>verificarCodigoExistente(e.target.value)}  />
</div>

  </div>
  <div className="form-outline mb-3">
      <label className="form-label" htmlFor="form1Example1" >descripcion del producto</label>
   
          <input type="text" id="form1Example1" className="form-control" value={descripcion}  onChange={(e) => setDescripcion(e.target.value)} required />
         
  </div>*/}
  <InputBarrCode
label="Codigo de barra"
type="text"
value={barrcode}
onChange={setBarrCode}
onKeyDown={verificarCodigoExistente}
msgError={msgError}
/>

<InputText
label="Descripción del producto"
type="text"
value={descripcion}
onChange={setDescripcion}
required
/>

<InputSelect
label="Categoria"
value={idcategoria}
onChange={setIdCategoria}
data={adpater_categoria(datosc)}

/>
<InputSelect
label="Medida"
value={idmedida}
onChange={setIdMedida}
data={adapter_medida(datosm)}

/>

<DropDown
   data={adpater_categoria(datosc)}
   value={buscarCategoria}
   setValue={setBuscarCategoria}
   onChange={BuscarCategoria}
   selected={idcategoria}
   setSelected={setIdCategoria}
   item={getNameCategoria(datosc,idcategoria)}
/>

  {/**
   * 

<DropDown
   data={adpater_categoria(datosc)}
   value={buscarCategoria}
   setValue={setBuscarCategoria}
   onChange={BuscarCategoria}
   selected={idcategoria}
   setSelected={setIdCategoria}
   Clear={Clear}

   />  


  <div className="form-outline mb-3">
      <label className="form-label" htmlFor="form1Example1" >Medida</label>
      <div className="col-12">  

                  <select className="form-select " id="floatingSelectGrid" data-live-search="true"  aria-label="Floating label select example" value={idmedida} onChange={(e)=>setIdMedida(e.target.value)}>
                  <option value={0} >-- Seleccionar --</option>
                         {datosm ? datosm.map((item,index) =>(
                         <option key={index} value={item.idmedida} data-tokens={item.nombre}>{item.nombre}</option>))
                         :
                        null
                          }
                    </select>
              </div> 
  </div>
  
 

      <DropDown
   data={CategoriaALista(listCategoria)}
   value={buscarCategoria}
   setValue={setBuscarCategoria}
   onChange={BuscarCategoria}
   selected={idcategoria}
   setSelected={setIdCategoria}
   Clear={Clear}

   />  
       
 <div className="form-outline mb-3">
    <label className="form-label" htmlFor="form1Example1" >Categoria</label>
    <div className="col-12">  
                  <select className="form-select " id="floatingSelectGrid" data-live-search={true} data-size="8" aria-label="Floating label select example" value={idcategoria} onChange={(e)=>setIdCategoria(e.target.value)}>
                
              
                  <option value={0} >-- Seleccionar --</option>
            
                 
                         {datosc ? datosc.map((item,index) =>(
                         <option key={index} value={item.idcategoria} data-tokens={item.nombre}>{item.nombre}</option>))
                         :
                        null
                          }
                    </select>
              </div>  
  </div> */}  
  
  
<InputText
label="Cantidad Maxíma"
type="number"
value={cant_max}
onChange={setCant_max}
required
/>
<InputText
label="Cantidad Miníma"
type="number"
value={cant_min}
onChange={setCant_min}
required
/>
 
  <div className="form-outline mb-3">
          <label  className="form-label" htmlFor="form1Example1" >Foto del producto</label>
        <div className="custom-file"> 
    <input type="file" className="form-control"  id="formFile"  aria-describedby="inputGroupFileAddon01" name={imagen} onChange={(e)=>{setImagen(e.target.files[0]); GetPreview(e.target.files[0],setPreviewImage)}} />
    <img src={previewImage} alt="..." height={50} width={50}></img>
  </div>
  </div>
  <InputState
  value={estado}
  onChange={setEstado}
  label="Estado"

  />
 {/* 
  <div className="form-outline mb-3 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-3">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio3" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setEstado("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio3">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio4" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setEstado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio4">No activo</label>
  </div>
</div>
  </div>*/}
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso producto */}
</div> 
: <DetalleProducto/> 
}

    </ItemProducto.Provider>
  )
}

export default Producto