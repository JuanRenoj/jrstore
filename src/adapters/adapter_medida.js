  const adapter_medida=(medida)=>{
    if(medida.length > 0){
        let newMedida=medida.map((item)=>{
            return {id:item.idmedida, name:item.nombre}
        })
        return newMedida
    }
return []    
}


const getNameCategoria=(medida,id)=>{
    if(medida.length > 0){
        for(let i in medida){
            if (Number(id)===Number(medida[i].idmedida)) {
                return medida[i].nombre
            }
        }
        return "";
    }
    return "";
}

export {getNameCategoria,adapter_medida}