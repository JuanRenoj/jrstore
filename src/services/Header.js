//import ls from "local-storage";
//import {Token }from "./Token"


const Token= JSON.parse(window.localStorage.getItem("usuario"));



class Header{
  
    headerGets(){       

        const headerGets={
            method:'GET',
            headers:{
                authorization:"Baerer "+Token.token,
                accept:'application/json',
                'Content-Type':'application/json',
            }
        }
        return headerGets;
    }
    headerPostSB(){
        const headerPostSB={
            method:'Post',
            headers:{
               authorization:"Baerer "+Token.token,
                accept:'application/json',
                'Content-Type':'application/json',
            }
        }
        return headerPostSB;
    }
    headerPostCB(data){
        const headerPostCB={
            method:'Post',
            headers:{
                authorization:"Baerer "+Token.token,
                accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        }
        return headerPostCB;
    }

    headerPostCBL(data){
        const headerPostCB={
            method:'Post',
            headers:{
                accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        }
        return headerPostCB;
    }
    headerGETCBI(){
        const headerPostCB={
            method:'GET',
            headers:{
                accept:'application/json',
                'Content-Type':'application/json',
            }
           
        }
        return headerPostCB;
    }

}
export default new Header();