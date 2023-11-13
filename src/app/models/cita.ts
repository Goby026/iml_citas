export class Cita {
    constructor(
        public fecha_solicitud: Date,
        public nombres: string,
        public apellidos: string,
        public dni: string,
        public dependencia: string,
        public num_documento: string,
        public fecha_cita: Date,
        public hora_cita:Date,
        public hora_inicio?:Date,
        public hora_fin?:Date,
        public fecha_peritaje?:Date,
        public elapsed_time?: Date,
        public idperito?: number,
        public idestado?: number,
        public iduser?: number,
        public id?: number,
    ){}
}
