export class Product {
    constructor(
        public id: number,
        public name: string,
        public brand: string,
        public code: string,
        public price: number,
        public stock: number,
        public image: string,
        public state: string,        
        public category_id: number
    ) {}
}