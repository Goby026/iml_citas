export class Reprogramacion {
    constructor(
        public fecha_reprogramada: Date,
        public hora_cita: Date,
        public estado?: boolean,
        public citaId?: number,
        public id? : number,
    ){}
}
