import React, {useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import swal from "sweetalert";
import IconSort from '../../Components/Buttons/IconSort';
import Estado from '../../Components/Estado';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
function Ubicacion() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idubicacion, setIdUbicacion] = useState("");
    const [nombre, setNombre] = useState("");   
    const [estado, setEstado] = useState("Activo");
    const [accion, setAccion] = useState("new");    
    const [sort, setSort]=useState("ASC")
    

useEffect(()=>{
ConsultaUbicacion();
},[])

    const ConsultaUbicacion=async()=>{
        const datosU=await Datos.Consulta("ubicacion");
        console.log(datosU)
        if(typeof datosU !== 'undefined'){
           console.log(datosU.res);
          setDatos(datosU.res);
          setDatosAux(datosU.res)   
          return          
        }
        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdUbicacion(0);        
        setNombre("");
        setEstado("Activo");
        setAccion("new")
       
      }
      const returnDatosCategoria = (codigo) => { 
      
        return { idubicacion:codigo,
            nombre:nombre,
            estado:estado,
         }
       }
      const Ingresar=async()=>{   
        let ubicacion=await Datos.NuevoReg("ubicacion",returnDatosCategoria(0));
        if(typeof ubicacion !== 'undefined'){
      swal("Ubicacion","Ingresado exitosamente","success");
           limpiar();
            ConsultaUbicacion();
          }
      }
      const Actualizar=async()=>{  
        let ubicacion=await Datos.ActualizarReg("ubicacion",returnDatosCategoria(idubicacion));
        if(typeof ubicacion !== 'undefined'){    
            swal("Ubicacion","Actualizado exitosamente","success");
            ConsultaUbicacion();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let ubicacion=await Datos.BorrarReg("ubicacion",datos.idubicacion);
        if(typeof ubicacion!=="undefined"){
            swal("Ubicacion", "Eliminado con exíto","success")         
            ConsultaUbicacion();
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
  setIdUbicacion(datos.idubicacion);
  setNombre(datos.nombre);
  setEstado(datos.estado);
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
          const AbrirIngreso=(e)=>{
            let myInput = document.getElementById("exampleModal");
            e.target.addEventListener("shown.bs.modal", function () {
              myInput.focus();
            });
          }

        const sortItem = (col) => { 
 
          if(sort ==="ASC"){
           const newDatos=[...datos].sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 );
           setDatos(newDatos)
           setSort("DESC")
            return
          }
        
          const newDatos=[...datos].sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 );
          setDatos(newDatos)
          setSort("DESC")
           return
         }

  return (
    <>
    <div className='div-header'>
    <label className='title-orden mt-3'>Ubicacion</label>
      <div className='row mt-3'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Ubicacion..."  

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
        <th onClick={()=>sortItem("nombre")}><IconSort col={"Nombre"}/></th>
        <th>Estado</th>  
        <th>Opciones</th>
        </HeaderTable>
        <BodyTable>
          {
          datos.map((item,index) =>(
          <tr key={index}>
          <td>{item.nombre}</td>
          <td><Estado estado={item.estado}/></td>
          <ButtonOptions item={item} Eliminar={Eliminar} Actualizar ={AbrirActualizar} /> 
          </tr>
          )) 
          }
        </BodyTable>
      </ContainTable> 
      : 
      <Loader/>

      }

      </div>
     
    
         
{/**modal para ingreso de ubicacion */}

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
        <h5 className="modal-title">Ingreso de Ubicacion</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idubicacion} onChange={(e) => setIdUbicacion(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)}  required/>
           
  </div>

  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio3" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setEstado("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio3">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="estado" id="inlineRadio4" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setEstado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio4">No activo</label>
  </div>
</div>
  </div>
 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso ubicacion */}

    </>
  )
}

export default Ubicacion