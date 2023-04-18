import swal from "sweetalert";

const ConvertirAMoneda=(valor)=>{
    const moneda=Intl.NumberFormat("es-GT",{
        style:"currency",
        currency:"GTQ"
    }).format(valor);
    return moneda;
}

function ProductoAListaDropDown(producto){
  if(producto.length >0){
return producto.map((item)=>{
  return {id:item.idproducto, name:item.descripcion}
})
  }
}


function CategoriaALista(categoria){

  return categoria.map((item)=>{
    return {id:item.idcategoria, name:item.nombre}
  })
}


const Cantidad = (cantidad,vendido,factor,nombre) => {
  let newcant=cantidad ? cantidad : 0
  let newvendido=vendido ? vendido : 0
  let total=Aproximar ((Number(newcant)+Number(newvendido))/factor)+" "+nombre
  return total
}
const CantidadUnit = (cantidad,vendido,prefijo) => {
  let newcant=cantidad ? cantidad : 0
  let newvendido=vendido ? vendido : 0
  let total=Aproximar(Number(newcant)+ Number(newvendido))+" "+prefijo
  return total
}

const Aproximar = (params) => {
  const final=Math.round((params + Number.EPSILON) * 100)/100
  return final
}

export {ConvertirAMoneda, ProductoAListaDropDown,Cantidad, CantidadUnit,Aproximar,CategoriaALista}