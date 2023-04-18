import React, {useEffect, useState}from 'react'
import SearchBar from '../../Components/SearchBar'
import Datos from '../../services/Datos';
import swal from "sweetalert";
import FormCliente from '../../Components/Forms/FormCliente';

import IconSort from '../../Components/Buttons/IconSort';
import ContainTable from '../../Components/Table/ContainTable';
import HeaderTable from '../../Components/Table/HeaderTable';
import BodyTable from '../../Components/Table/BodyTable';
import ButtonOptions from '../../Components/Buttons/ButtonOptions';
import Loader from '../../Components/Loader';



//const bootstrap=require('bootstrap');
function Cliente() {
    const [buscar, setBuscar] = useState("")
    const [datos, setDatos]=useState([]);
    const [datosAux, setDatosAux]=useState([]);
 const [newClient, setnewClient] = useState(false);
   const [SelectedCliente, setSelectedCliente] =useState("");

    
 

    const [sort, setSort]=useState("ASC")
useEffect(()=>{
ConsultarCliente(false);
},[])

    const ConsultarCliente=async(ultimo)=>{
        const datos=await Datos.Consulta("cliente");
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
      const Eliminar=async(datos)=>{
        let cliente=await Datos.BorrarReg("cliente",datos.idcliente);
        if(typeof cliente!=="undefined"){
            swal("Cliente", "Eliminado con exíto","success")         
            ConsultarCliente(false);
        }
      }
  
      const AbrirIngreso=(e)=>{
        setSelectedCliente(null)
        setnewClient(true);
    //const mymodal=new bootstrap.Modal(document.getElementById("exampleModal"));
    //mymodal.show()
      }

      const AbrirActualizar=(datos,e)=>{
        setSelectedCliente(datos)
        setnewClient(true);
      }
  
    const Busqueda =(text)=>{
       
        setBuscar(text);
        
        setDatos(datosAux.filter((item)=>{
            return   item.nombre.toLowerCase().includes(text.toLowerCase()) || item.apellido.toLowerCase().includes(text.toLowerCase());   
          }).map((element)=>{
            return element
          })
         );
        
          }
      
        const sortItem = (col) => { 
         if(sort==="ASC"){
          let sorted=[...datos.sort((a,b)=>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
          )]
          setDatos(sorted)
          setSort("DESC")
          return
         }
         let sorted=[...datos.sort((a,b)=>
         a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
         )]
         setDatos(sorted)
         setSort("ASC")
         
          
         }

  return (
    <>
      <div className="div-header">
        <label className="title-orden mt-3" >Cliente</label>
        <div className="row mt-3">
          <SearchBar
            onChange={Busqueda}
            value={buscar}
            placeholder="Buscar Cliente..."
            data_bs_toggle="modal"
            data_bs_target="#exampleModal"
            onClick={AbrirIngreso}
          />
        </div>
      </div>
      <div className="div-body">
{datos.length > 0 ?<ContainTable>
  <HeaderTable>
  <th onClick={() => sortItem("nombre")}>   <IconSort col={"Nombre"}/></th>
  <th onClick={() => sortItem("apellido")}><IconSort col={"Apellido"}/></th>
  <th onClick={() => sortItem("direccion")}><IconSort col={"Dirección"}/></th>
  <th>Telefono </th>
  <th>Correo</th>
  <th>Opciones</th>
  </HeaderTable>
  <BodyTable>{
    datos.map((item, index) => (
      <tr key={index}>
        <td>{item.nombre}</td>
        <td>{item.apellido}</td>
        <td>{item.direccion}</td>
        <td>{item.telefono}</td>
        <td>{item.correo}</td>
        <ButtonOptions item={item} Eliminar={Eliminar} Actualizar={AbrirActualizar} />
      </tr>
    ))
    }</BodyTable>
</ContainTable> :
 <Loader/> 
 }
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
                Item={SelectedCliente}
                ConsultarCliente={ConsultarCliente}
              />
             : null}
          </div>
        </div>
      </div>
      {/** fin del modal de ingreso cliente */}
    </>
  );
}

export default Cliente