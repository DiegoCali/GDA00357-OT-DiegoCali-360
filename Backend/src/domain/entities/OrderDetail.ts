export class OrderDetail {
    constructor(
        public id: number,
        public order_id: number,
        public product_id: number,
        public quantity: number,
        public price: number,
        public subtotal: number,
    ) {}
}