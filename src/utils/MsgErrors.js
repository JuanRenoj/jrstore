
import swal from "sweetalert";

export  function MsgErrors(error, tabla){
    const titulo="Aviso";
switch (error) {
  case 404:
    swal(titulo, "No se encontro registo de " + tabla, "error");
    break;
  case 403:
    swal(titulo, "Se encuentra prohibido la consulta de " + tabla, "error");
    break;
  case 500:
    swal(titulo, "No se encuentra disponible el servidor", "error");
    break;
    case 503:
    swal(titulo, "No se completo la acción, error interno. Revise. ", "error");
    break;
    case 300:
    swal(titulo, "Seleccion Multiple", "error");
    break;
    case "Failed to fetch":
    swal(titulo, "No se encontra disponible el servidor. Revise y vuelva a intentarlo", "error");
    break;
  default:
    swal(titulo, "Revise y vuelva a intentarlo " + error, "warning");
    break;
}
}
