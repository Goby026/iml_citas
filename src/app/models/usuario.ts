export class Usuario {
    constructor(
        public username: string,
        public password: string,
        public nombres?: string,
        public apellidos?: string,
        public dni?: number,
        public estado?: number,
        public id?: number,
    ){}
}
