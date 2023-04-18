 const adpater_categoria=(categoria)=>{

    if(categoria.length >0){
    let newCategoria=categoria.map((item)=>{
        return {id:item.idcategoria, name:item.nombre}
    })
    return     newCategoria;
    }

return []
}

const getNameCategoria=(categoria,id)=>{
    if(categoria.length > 0){
        for(let i in categoria){
            if (Number(id)===Number(categoria[i].idcategoria)) {
                return categoria[i].nombre
            }
        }
        return "";
    }
    return "";
}

export {getNameCategoria,adpater_categoria}