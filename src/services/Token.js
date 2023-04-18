
import { useSelector } from "react-redux";

 function Token(){
    const {token}=useSelector(state => state.user);
    console.log(token)
let nuevo_token=token
return nuevo_token;
}

export {Token};