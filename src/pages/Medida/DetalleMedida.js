import React, {useContext, useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import { ItemMedida } from '../../Context/Context';
import swal from "sweetalert";
import IconSort from '../../Components/Buttons/IconSort';
import Loader from '../../Components/Loader';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
function DetalleMedida() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [iddetallem, setIdDetallem] = useState("");
    const [idmedida, setIdMedida] = useState("");   
    const [nombre, setNombre] = useState("");
     const [factor, setFactor] = useState("");   
    // const[abrevfactor,setAbrevfactor]=useState("");
   
    const [accion, setAccion] = useState("new");
    const [estado, setEstado] = useState("");

    const [sort, setSort]=useState("ASC")
 
 
   const{
    medidaSelected,
    setMedidaSelected,
    setVerDetalle,
    verDetalle,
    ConsultarMedida
   }=useContext(ItemMedida);
    
    
useEffect(()=>{
ConsultarDetalleMedida(medidaSelected.idmedida);
setIdMedida(medidaSelected.idmedida);

},[])

    const ConsultarDetalleMedida=async(medida)=>{
        const datosDM=await Datos.ConsultaDetalleID("detallemedida",medida);
        console.log(datosDM)
        if(typeof datosDM !== 'undefined'){
           console.log(datosDM.res);
          setDatos(datosDM.res);
          setDatosAux(datosDM.res)   
          return          
        }

        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdDetallem(0);        
       // setIdMedida("");
     
        setNombre("");
        setFactor("");     
//  setAbrevfactor("")
        setAccion("new");
      }
      const returnDatosCliente = (codigo) => { 
      
        return { iddetallem:codigo,
            idmedida:idmedida,
           nombre:nombre,
            factor:factor
            //abrevfactor:abrevfactor
        }
       }
      const Ingresar=async()=>{   
        let detallemedida=await Datos.NuevoReg("detallemedida",returnDatosCliente(0));
        if(typeof detallemedida !== 'undefined'){
      swal("DetalleMedida","Ingresado exitosamente","success");
           limpiar();
            ConsultarDetalleMedida(medidaSelected.idmedida);
          }
      }
      const Actualizar=async()=>{  
        let detallemedida=await Datos.ActualizarReg("detallemedida",returnDatosCliente(iddetallem));
        if(typeof detallemedida !== 'undefined'){    
            swal("DetalleMedida","Actualizado exitosamente","success");
            ConsultarDetalleMedida(medidaSelected.idmedida);
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let detallemedida=await Datos.BorrarReg("detallemedida",datos.iddetallem);
        if(typeof detallemedida!=="undefined"){
            swal("DetalleMedida", "Eliminado con exíto","success")         
            ConsultarDetalleMedida(medidaSelected.idmedida);
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
  setIdDetallem(datos.iddetallem);
  setIdMedida(datos.idmedida);
  setNombre(datos.nombre);
 
  setFactor(datos.factor);
 //setAbrevfactor(datos.abrevfactor);
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
          let newDatos=  [...datos].sort((a,b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1 );
            setDatos( newDatos)
            setSort("DESC")
            return
          }
          let newDatos=  [...datos].sort((a,b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1 );
          setDatos( newDatos)
          setSort("ASC")
       
         }

  return (
    <>
    <div className='div-header'>
   
    <div className='row ps-3 mt-2'>

<button className='btn btn-secondary-outline btn-sm d-flex justify-content-start align-items-center btn-op' onClick={()=>{setVerDetalle(false)}}>
<i class="fa-solid fa-chevron-left"></i> <span className='ms-2'>Atras</span>
  </button>
 
   
 </div>
 <label className='title-orden mt-2'>Detalles de la Medida:   {medidaSelected.nombre } </label>

      <div className='row mt-2'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Detalle..."  

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
       </div>
       
       
    </div>
    <div className='div-body'>
      {
        datos.length > 0  ? 
        <ContainTable>
          <HeaderTable>
          <th onClick={()=>sortItem("nombre")} ><IconSort col={"Nombre"} /></th>
            <th>Cantidad</th>
            <th>Opciones</th>
          </HeaderTable>
          <BodyTable>{
          datos.map((item,index) =>(
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.factor +"  "+item.prefijo}</td> 
              <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar} />             
            </tr>
           ))}
          </BodyTable>
        </ContainTable>
        : <Loader/>
      }

      </div>
     
    
         
{/**modal para ingreso de detallemedida */}

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
        <h5 className="modal-title">Ingreso de Detalle Medida</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={iddetallem} onChange={(e) => setIdDetallem(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" hidden= {true}>Medida</label>
   
          <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idmedida}  onChange={(e) => setIdMedida(e.target.value)}  required/>
           
  </div>
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Nombre</label>
  
        <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)} required/>
      
  </div> 
  
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Cantidad en: {`(${medidaSelected.prefijo})`}</label>
   
          <input type="number" id="form1Example1" className="form-control" value={factor}  onChange={(e) => setFactor(e.target.value)} required />
         
  </div>
  {/** 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1" >Abreviatura de factor</label>
   
          <input type="text" id="form1Example1" className="form-control" value={abrevfactor}  onChange={(e) => setAbrevfactor(e.target.value)} required />
         
  </div>
 */}
 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso detallemedida */}

    </>
  )
}

export default DetalleMedida;