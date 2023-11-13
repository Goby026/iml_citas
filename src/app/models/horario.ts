export class Horario {
    constructor(
        public hora: Date,
        public descripcion: string,
        public estado?: boolean,
        public id? : number,
    ){}
}
