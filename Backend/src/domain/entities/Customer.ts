export class Customer {
    constructor(
        public id: number,
        public company_name: string,
        public comercial_name: string,
        public email: string,
        public delivery_address: string,
        public phone: string,
    ) {}
}