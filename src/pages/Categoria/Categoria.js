import React, {useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import swal from "sweetalert";
import IconSort from '../../Components/Buttons/IconSort';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import Loader from '../../Components/Loader';
function Categoria() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
    const [idcategoria, setIdCategoria] = useState("");
    const [nombre, setNombre] = useState("");   
    const [accion, setAccion] = useState("new");    
    const [sort, setSort]=useState("DESC")
    

useEffect(()=>{
ConsultarCategoria();
},[])

    const ConsultarCategoria=async()=>{
        const datosC=await Datos.Consulta("categoria");
        console.log(datosC)
        if(typeof datosC !== 'undefined'){
           console.log(datosC.res);
          setDatos(datosC.res);
          setDatosAux(datosC.res)   
          return          
        }
        setDatos([])
        setDatosAux([])
      }


      const limpiar=()=>{
        setIdCategoria(0);        
        setNombre("");
       
      }
      const returnDatosCategoria = (codigo) => { 
      
        return { idcategoria:codigo,
            nombre:nombre,
         }
       }
      const Ingresar=async()=>{   
        let categoria=await Datos.NuevoReg("categoria",returnDatosCategoria(0));
        if(typeof categoria !== 'undefined'){
      swal("Categoria","Ingresado exitosamente","success");
           limpiar();
            ConsultarCategoria();
          }
      }
      const Actualizar=async()=>{  
        let categoria=await Datos.ActualizarReg("categoria",returnDatosCategoria(idcategoria));
        if(typeof categoria !== 'undefined'){    
            swal("Categoria","Actualizado exitosamente","success");
            ConsultarCategoria();
            limpiar();
          }
      }

      const Eliminar=async(datos)=>{
        let categoria=await Datos.BorrarReg("categoria",datos.idcategoria);
        if(typeof categoria!=="undefined"){
            swal("Categoria", "Eliminado con exíto","success")         
            ConsultarCategoria();
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
  setIdCategoria(datos.idcategoria);
  setNombre(datos.nombre);
 
  setAccion("update");
  
  var myInput = document.getElementById("exampleModal");
      e.addEventListener("shown.bs.modal", function () {
        myInput.focus();
      });
      }
  
    const Busqueda =(text)=>{

       // let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
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
           const newDatos=datosAux.sort((a,b)=>a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
           setDatos(newDatos)
           setSort("DESC")
            return
          }        
          const newDatos=datosAux.sort((a,b)=>a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
          setDatos(newDatos)
          setSort("ASC")
           return
         }

  return (
    <>
    <div className='div-header'>
    <label className='title-orden mt-3'>Categoria</label>
      <div className='row mt-3'>
           <SearchBar
            onChange={Busqueda} 
            value={buscar} 
            placeholder="Buscar Categoria..."  

            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
            />
       </div>
        
       
    </div>
    <div className='div-body'>
{ datos.length > 0 ? 
  <ContainTable>
    <HeaderTable>
    <th onClick={() => sortItem("nombre")}><IconSort col={"nombre"}/></th>
    <th>Opciones</th>
    </HeaderTable>
    <BodyTable>
       { datos.map((item,index)=>(
          <tr key={index}>
             <td>{item.nombre}</td>
             <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar}
             />
          </tr>
        ))
    }
    </BodyTable>
   
  </ContainTable>
  : 
  <Loader />
}
      </div>
     
 
         
{/**modal para ingreso de categoria */}

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
        <h5 className="modal-title">Ingreso de Categoria</h5>

        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo </label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idcategoria} onChange={(e) => setIdCategoria(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form1Example1">Nombre</label>
   
          <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setNombre(e.target.value)}  required/>
           
  </div>

 
    </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" className="btn btn-primary" >Guardar</button>
      </div>
    </div>
  </div>
</form>
{/** fin del modal de ingreso categoria */}

    </>
  )
}

export default Categoria