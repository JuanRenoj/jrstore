import {host} from "./Host";
//import Header from "../services/Header";
import Header from "./Header"

import { MsgErrors } from "../utils/MsgErrors";


class Datos{
    async Consulta(table){
        try {
            
            const info=await fetch(`${host+table}/view`,Header.headerGets());
            if(!info.ok){
                MsgErrors(info.status,table);
                return
            }
            return await info.json();
        } catch (error) {
           MsgErrors(error.message,""+error.message) ;
        }
    }
  async  NuevoReg(table,datos){
try {
    const info= await fetch(`${host+table}`,Header.headerPostCB(datos));
    if(!info.ok){
        MsgErrors(info.status,table);
        return
    }
    return await info.json();
} catch (error) {
    MsgErrors(error.message,""+error.message) ;
}

    }
  async  ActualizarReg(table,datos){
    try {
        const info= await fetch(`${host+table}/update`,Header.headerPostCB(datos));
     
        if(!info.ok){
            MsgErrors(info.status,table);
            return
        }
        return await info.json();
    } catch (error) {
        MsgErrors(error.message,""+error.message) ;
    }
        
    }
 async   BorrarReg(table, id){
        try {
            const info= await fetch(`${host+table}/delete/${id}`,Header.headerPostSB());            
            if(!info.ok){
                MsgErrors(info.status,table);
                return
            }
            return await info.json();
        } catch (error) {
            MsgErrors(error.message,""+error.message) ;
        }
       
    }
   async ConsutaID(table, id){
    try {
        const info= await fetch(`${host+table}/viewone/${id}`,Header.headerGets());            
            if(!info.ok){
                MsgErrors(info.status,table);
                return
            }
            console.log(info)
            return await info.json();  
    } catch (error) {
        MsgErrors(error.message,""+error.message) ;  
    }
}
    async ConsultaPDF(table, id){
        try {
            const info= await fetch(`${host+table}/viewone/${id}`,{
                method: 'GET',
                mode:'cors',
                headers:{
                  'Accept': 'application/json',
                  "X-Content-Type-Options": "nosniff"
            }});            
                if(!info.ok){
                    MsgErrors(info.status,table);
                    return
                }
                console.log(info)
                return  info;  
        } catch (error) {
            MsgErrors(error.message,""+error.message) ;  
        }
      
    }
    async ConsultaDetalleID(table, id){
        try {
            const info= await fetch(`${host+table}/viewxd/${id}`,Header.headerGets());            
                if(!info.ok){
                    MsgErrors(info.status,table);
                    return
                }
                return await info.json();  
        } catch (error) {
            MsgErrors(error.message,""+error.message) ;  
        }
          
        }
async    ConsutaIDUser(table, id){
    try {
        const info= await fetch(`${host+table}/emp/${id}`,Header.headerGets());            
        if(!info.ok){
            MsgErrors(info.status,table);
            return
        }
        return await info.json();    
    } catch (error) {
        MsgErrors(error.message,""+error.message) ;  
    }
      
    }

   
  
   async ConsultaUser(data){
    try {
        const info= await fetch(`${host}usuario/login`,Header.headerPostCBL(data));    
    //    console.log(info)        
        if(!info.ok){
            MsgErrors(info.status,"Usuario");
            return
        }
        return await info.json();     
    } catch (error) {
        console.log(error)
        MsgErrors(error.message,""+error.message) ;    
    }
     
    }
   async ConsultaPermiso(id){
    try {
        const info= await fetch(`${host}permiso/emp/${id}`,Header.headerGets());            
        if(!info.ok){
            MsgErrors(info.status,"Permiso");
            return
        }
        return await info.json();     
    } catch (error) {
        MsgErrors(error.message,""+error.message) ;    
    }
       
    }
   async ConsultaCuentaXP(id){
    try {
        const info= await fetch(`${host}cuenta_proveedor/viewxp/${id}`,Header.headerGets());            
        if(!info.ok){
            MsgErrors(info.status,"Cuenta por Proveedor");
            return
        }
        return await info.json();     
    } catch (error) {
        MsgErrors(error.message,""+error.message) ;    
    }
       
    }

    async ConsultaAbonoXC(id){
        try {
            const info= await fetch(`${host}abono_proveedor/viewxc/${id}`,Header.headerGets());            
            if(!info.ok){
                MsgErrors(info.status,"Abono por Proveedor");
                return
            }
            return await info.json();     
        } catch (error) {
            MsgErrors(error.message,""+error.message) ;    
        }
           
      
    }

   async consultarInforme(tabla,datos){
    try {
        const info= await fetch(`${host}informe/${tabla}`,Header.headerPostCB(datos));            
        if(!info.ok){
            MsgErrors(info.status,"Informe");
            return
        }
        return await info.json();     
    } catch (error) {
        MsgErrors(error.message,""+error.message) ;    
    }
      
      }
      
    async  ConsultaInfo(table){
        try {
            const info= await fetch(`${host+table}/view`,Header.headerGETCBI());            
            if(!info.ok){
                MsgErrors(info.status,"Informe");
                return
            }
            return await info.json();     
        } catch (error) {
            MsgErrors(error.message,""+error.message) ;    
        }
      
    }
    async UplodaImg(datos){
        const formDatos=new FormData()
        formDatos.append('foo',datos);
        try{
            const info= await fetch(`${host}img/upload`,{
                method:"POST",
                body:formDatos
            });
            console.log(info)
            if(!info.ok){
                MsgErrors( info.status,"Imagen");
                return
            }
            return await  info.json()
        }
        catch(error){
            MsgErrors(error.message,""+error.message) ;    
        }
    }

    async ViewImage(name){
       
        try{
            const info= await fetch(`${host}img/view/${name}`,{
                method:"GET",
                mode:"cors",
                headers:{
                    'Accept':'application/json',
                    'X-Content-Type-Options':'nosniff'
                }

            });
            if(!info.ok){
                MsgErrors( info.status,"Imagen");
                return
            }
            return await  info.json()
        }
        catch(error){
            MsgErrors(error.message,""+error.message) ;    
        }  
    }
    async ViewImages(name){
       
        try{
            const info= await fetch(`${host}img/view/${name}`,{
                method:"GET",
                mode:"cors",
                headers:{
                    'Accept':'application/json',
                    'X-Content-Type-Options':'nosniff'
                }

            });
            if(!info.ok){
                MsgErrors( info.status,"Imagen");
                return
            }
            return await   info.json()
        }
        catch(error){
            MsgErrors(error.message,""+error.message) ;    
        }  
    }
    async DeleteImage(name){
        try{
            const info=fetch(`${host}img/delete/${name}`,{
                method:"GET",
          
                headers:{
                    'Accept':'application/json',
                    'X-Content-Type-Options':'nosniff'
                }

            });
            if(!info.ok){
                MsgErrors( info.status,"Imagen");
                return
            }
            return await  info.json()
        }
        catch(error){
            MsgErrors(error.message,""+error.message) ;    
        }  
    }
}
export default new Datos();