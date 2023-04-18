import moment from 'moment'
import React, {useEffect, useState} from 'react'
import swal from 'sweetalert'
import BarChart from '../../Components/Chart/BarChart'
import DoughnutChart from '../../Components/Chart/DoughnutChart'
import LineChart from '../../Components/Chart/LineChart'
import PieChart from '../../Components/Chart/PieChart'
import { ConvertirAMoneda } from '../../utils/Funciones'
import Datos from '../../services/Datos'


function Balance() {
    const [info, setInfo] = useState([])
    const [inicio,setInicio] =useState("");
    const [final,setFinal]=useState("");
    const [totalVenta,setTotalVenta] =useState("");
    const [totalCompra,setTotalCompra]=useState("");
    const [totalGanancia,setTotalGancia]= useState("");
    const [accion, setAccion] = useState("")

  const data={
    labels: info.map((item)=>item.tipo ),
    datasets:[
      {
        label:"Ventas",
        data:info.map((item)=>item.ventas),
        backgroundColor:["#FF5733 "],
        yAxisID:'y',
      },
      {
        label:"compras",
        data:info.map((item)=>item.compras),
        backgroundColor:["#33FFEB"],
        yAxisID:'y1',
    },
    ],

  }
  /**  
      }, */
  const options={
    responsive: true,
    interaction: {
      mode: 'index' ,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Producto mas vendido',
      },
    },
    scales: {
      y: {
        type: 'linear' ,
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear' ,
        display: true,
        position: 'right' ,
        grid: {
          drawOnChartArea: false,
        },
     
    },
},

  }

  useEffect(()=>{
//setInicio(moment(new Date()).format("DD/MM/YYYY"))
//setFinal(moment(new Date()).format("DD/MM/YYYY"))
  },[])

const dataImforme = (accion) => {
  return{
    inicio:moment(inicio).format("YYYY-MM-DD"),
    final:moment(final).format("YYYY-MM-DD"),
    accion:accion
  }
}

const ConsultarInforme = async(accion) => {
  console.log(dataImforme(accion))
  let facts= await Datos.consultarInforme("balance",dataImforme(accion));
  if(typeof facts !== 'undefined'){
    setInfo(facts.res)
    console.log(facts.res)
    calcularTotales(facts.res)
    return
  }
  setInfo([])
  
}
const verInforme = async (tipo) => {
  console.log(inicio+" "+final )
  if( inicio.length  > 0 && final.length  > 0 ){
  setAccion(tipo)
  await ConsultarInforme(tipo)
  return
}
swal("Aviso","Por favor  de seleccionar las fecha de inicio y final","warning")

}

const calcularTotales = (data) => {
    let ventas = 0;
    let compras = 0;
    let ganancia = 0;
    if(data.length >0){
 for(let i in data){
    ventas=Number(ventas) + Number(data[i].ventas)
    compras=Number(compras) + Number(data[i].compras)
    ganancia=Number(ganancia) + Number(data[i].ganancia)
 }}
 setTotalVenta(ventas);
 setTotalCompra(compras);
 setTotalGancia(ganancia);
}

const returnTipo = (tipo) => {
    switch(tipo){
        case "day": 
        return "Día";
        case "week": 
        return "Semana";
        case "month": 
        return "Mes";
        case "year": 
        return "Año";
        default:
        return "Tipo";

    }
    
}

  return (
    <>
   <div className='div-header'>
    <label className='title-orden'>Imforme de cuenta</label>
 
  <div className='d-flex flex-row w-100  align-items-center pe-3'>
<div className='col-md-4 col-sm-4 '>
  <label className=" " id="inputGroup-sizing-sm">Seleccionar fecha de referencia:</label>
  </div>
  <div className='col-md-4 col-sm-4 m-1 '>
  <div className="input-group input-group-sm  ">
  <span className="input-group-text" id="inputGroup-sizing-sm">Inicio</span>
  <input type="date" className="form-control form-control-sm" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={inicio}  onChange={(e)=>setInicio(e.target.value)} />
</div></div>
<div className='col-md-4 col-sm-4 m-1'>
<div className="input-group input-group-sm  ">
  <span className="input-group-text" id="inputGroup-sizing-sm">Final</span>
  <input type="date" className="form-control form-control-sm" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={final}  onChange={(e)=>setFinal(e.target.value)} />
</div>
</div>

  </div>
  <label className='mt-1'>Ordenar Por:</label>
    <div className='d-flex flex-row w-100'>
    <div className='form-check m-1'>
    <input className="form-check-input" type="checkbox" value={accion} checked ={accion==="day" ? true :false} onChange={(e)=>verInforme("day")}  id="flexCheckDefault"/>
    <label className="form-check-label" htmlFor="flexCheckDefault">Día</label>
</div>
<div className='form-check m-1'>
    <input className="form-check-input" type="checkbox" value={accion} checked ={accion==="week" ? true :false} onChange={(e)=>verInforme("week")}  id="flexCheckDefault"/>
    <label className="form-check-label" htmlFor="flexCheckDefault">Semana</label>
</div>
<div className='form-check m-1'>
    <input className="form-check-input" type="checkbox" value={accion} checked ={accion==="month" ? true :false} onChange={(e)=>verInforme("month")}  id="flexCheckDefault"/>
    <label className="form-check-label" htmlFor="flexCheckDefault">Mes</label>
</div>
<div className='form-check m-1'>
    <input className="form-check-input" type="checkbox" value={accion} checked ={accion==="year" ? true :false} onChange={(e)=>verInforme("year")}  id="flexCheckDefault"/>
    <label className="form-check-label" htmlFor="flexCheckDefault">Año</label>
</div>

    </div>
  
   </div>
   <div className='div-body'>
<div className='row w-100 h-30 m-0' >
    <div className='col-sm-3 col-md-3 col-lg-3 div-ventas'>
        <label className='desc-card-info'>{ConvertirAMoneda(totalVenta)}</label>
        <label className='title-card-info'>Total de Venta</label>
    </div>
    <div className='col-sm-3 col-md-3 col-lg-3  div-inversion'>
    <label className='desc-card-info'>{ConvertirAMoneda(totalCompra)}</label>
        <label className='title-card-info'>Total de Inversion</label>
</div>
<div className='col-sm-3 col-md-3 col-lg-3 div-ganancia'>
<label className='desc-card-info'>{ConvertirAMoneda(totalGanancia)}</label>
        <label className='title-card-info'>Total de Ganancia</label>
</div>
</div>
    <div className='row w-100 h-70 m-0' >
    <div className='col-md-6 col-lg-6 col-sm-12'>
<div className='.div-right-detail'>
     <LineChart dataUser={data} options={options}/>
     </div>  
   </div>
    <div className='col-md-6 col-lg-6 col-sm-12 div-left-detail'>
      <label className='title-orden m-3'>Lista de ventas</label>
      <div className='contain-list'>
      <ul className='list-items-contain'>
      <li  className='item-list row '>
         
         <label className='col-md-3 col-lg-3 col-sm-3'>{returnTipo(accion)}</label>
         <label className='col-md-3 col-lg-3 col-sm-3'>Venta</label>
         <label className='col-md-3 col-lg-3 col-sm-3'>Compras  </label>
         <label className='col-md-3 col-lg-3 col-sm-3'>Ganancia  </label>
         </li> 
      {
        info.length > 0  ?
        info.map((item,index)=>(
        <li key={index}  className='item-list row '>
         
        <label className='desc-list col-md-3 col-lg-3 col-sm-3'>{item.tipo}</label>
        <label  className='type-list col-md-3 col-lg-3 col-sm-3'>{ConvertirAMoneda(item.ventas)}</label>
        <label  className='type-list col-md-3 col-lg-3 col-sm-3'>{ConvertirAMoneda(item.compras)}</label>
        <label className='cant-list col-md-3 col-lg-3 col-sm-3'>{ConvertirAMoneda(item.ganancia)  }</label>
        </li>

        ))
        : null
      }
      </ul>
      </div>    
      </div>
      </div>
      </div>
   {/** <PieChart dataUser={data} /> 
    <BarChart dataUser={data} />*/} 
    </>
  )
}

export default Balance