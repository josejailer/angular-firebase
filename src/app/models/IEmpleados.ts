import { DocumentReference } from "@firebase/firestore-types";
import { ICargos } from "./ICargos";

export interface IEmpleados {
    idEmpleado?: string;
    nombreEmpleado?: string;
    fechaNacimientoEmplado?:Date;
    paisEmplado?:string;
    estadoEmpleado?:boolean
    fechaContratacionEmplado?:Date;
    cargoEmpleado?:string;
    areaEmpleado?:string;
    edadEmpleado?:string;
    comision?:string;
    nombreUsuario?:string;

}