export class Order {
    constructor(
        public id: number,
        public user_id: number,
        public total: number,
        public state: string,        
        public details: number[]
    ) {}
}