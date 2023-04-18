import React, {useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';

import swal from "sweetalert";
import { ItemMedida } from '../../Context/Context';
import DetalleMedida from './DetalleMedida';
import IconSort from '../../Components/Buttons/IconSort';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
function Medida() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idmedida, setIdMedida] = useState("");
    const [nombre, setNombre] = useState("");   
    const [prefijo,setPrefijo]= useState("");
    const [accion, setAccion] = useState("new");    
    const [sort, setSort]=useState("ASC")
    const [medidaSelected, setMedidaSelected] =useState([]);
    const [verDetalle, setVerDetalle] =useState(false);

useEffect(()=>{
ConsultarMedida();
},[])

    const ConsultarMedida=async()=>{
        const datosM=await Datos.Consulta("medida");
        console.log(datosM)
        if(typeof datosM !== 'undefined'){
           console.log(datosM.res);
          setDatos(datosM.res);
          setDatosAux(datosM.res)   
          return          
        }
        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdMedida(0);        
        setNombre("");
        setPrefijo("");
        setAccion("new")
       
      }
      const returnDatosCategoria = (codigo) => { 
        return { 
          idmedida:codigo,
          nombre:nombre,
          prefijo:prefijo
         }
       }
      const Ingresar=async()=>{   
        let medida=await Datos.NuevoReg("medida",returnDatosCategoria(0));
        if(typeof medida !== 'undefined'){
      swal("Medida","Ingresado exitosamente","success");
           limpiar();
            ConsultarMedida();
          }
      }
      const Actualizar=async()=>{  
        let medida=await Datos.ActualizarReg("medida",returnDatosCategoria(idmedida));
        if(typeof medida !== 'undefined'){    
            swal("Medida","Actualizado exitosamente","success");
            ConsultarMedida();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let medida=await Datos.BorrarReg("medida",datos.idmedida);
        if(typeof medida!=="undefined"){
            swal("Medida", "Eliminado con exíto","success")         
            ConsultarMedida();
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
  setIdMedida(datos.idmedida);
  setNombre(datos.nombre);
 setPrefijo(datos.prefijo)
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
          
          if(sort === "ASC"){
           const newDatos=[...datos].sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 );
           setDatos(newDatos)
           setSort("DESC")
            return
          }
        
          const newDatos=[...datos].sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 );
          setDatos(newDatos)
          setSort("ASC")
           
         }

         const valueProvider =  { 
            medidaSelected,
            setMedidaSelected,
            setVerDetalle,
            verDetalle,
            ConsultarMedida

          }
          const VerDetalle = (item) => {
            setMedidaSelected(item);
            setVerDetalle(true) ;
          }
  return (
    <ItemMedida.Provider value={valueProvider}>
        {!verDetalle ?
    <div>
    <div className='div-header'>
    <label className='title-orden mt-3'>Medida</label>
      <div className='row mt-3'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Medida..."  

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
  <th onClick={()=>sortItem("nombre")}><IconSort col="Nombre"/></th>
           <th onClick={()=>sortItem("prefijo")}><IconSort col="Prefijo" /></th>  
            <th>Opciones</th>
  </HeaderTable>
  <BodyTable>
    {
datos.map((item,index) =>(
  <tr key={index}>
     <td>{item.nombre}</td>
     <td>{item.prefijo}</td>
     <ButtonOptions
     item={item}
     Eliminar={Eliminar}
     Actualizar={AbrirActualizar}
     VerDetalle={VerDetalle}
     />     
   </tr>
 )) 
    }
  </BodyTable>
</ContainTable> 
: <Loader/>}

      </div>
     
    
         
{/**modal para ingreso de medida */}

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
        <h5 className="modal-title">Ingreso de Medida</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idmedida} onChange={(e) => setIdMedida(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)}  required/>
           
  </div>

  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Prefijo</label>
   
          <input type="text" id="form1Example1" className="form-control" value={prefijo}  onChange={(e) => setPrefijo(e.target.value)}  required/>
           
  </div>
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso medida */}
</div>   
 :
  <DetalleMedida/>
    }

    </ItemMedida.Provider>
  )
}

export default Medida