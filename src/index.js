import React from 'react';
import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';

import Inicio from  './pages/Menu/Inicio';
import { Modal } from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./Css/style.css";
import './Css/styleDropDown.css'
import './Css/styleList.css'
import "./Css/styleTable.css";
import "./Css/styleLogin.css";
import "./Css/styleMenu.css";
import "./Css/styleCalendar.css";
import { Provider } from 'react-redux'
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <Inicio />
    </Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
