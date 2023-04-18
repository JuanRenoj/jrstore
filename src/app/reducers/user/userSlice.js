import { createSlice } from "@reduxjs/toolkit";
//const usuario= JSON.parse(window.localStorage.getItem("usuario"));
/*
const initialState={
    idempleado:usuario ? usuario.idempleado : 0,
    nombre:usuario ? usuario.nombre : "",
    apellido:usuario ? usuario.apellido : "",
    idusuario:usuario ? usuario.idusuario : "",
    token:usuario ? usuario.token : "",
    isLogin:usuario ? true: false,
    
}*/
const initialState={
    idempleado: 0,
    nombre: "",
    apellido: "",
    idusuario:"",
    token: "",
    isLogin: false,
    
}

export const userSlice=createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
            state.idempleado=action.payload.idempleado;
            state.nombre=action.payload.nombre;
            state.apellido=action.payload.apellido;
            state.idusuario=action.payload.idusuario;
            state.token =action.payload.token;
            state.isLogin=action.payload.isLogin;
        },
        unsetUser:(state)=>{
            state.idempleado="";
            state.nombre="";
            state.apellido="";
            state.idusuario="";
            state.token ="";
            state.isLogin=false;
        },
     
    }
})
export const {setUser,getUser,unsetUser}=userSlice.actions;
export default userSlice.reducer;