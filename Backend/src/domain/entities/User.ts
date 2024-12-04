export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public phone: string,
        public birthdate: Date,
        public state: string,        
        public role: string,
        public customer_id: number|null
    ) {}
}