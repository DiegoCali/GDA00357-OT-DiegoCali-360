import { Product } from "../entities/Product";

export interface ProductRepository {
    getAll(): Promise<Product[]>;
    get(id: number): Promise<Product|null>;
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<void>;
    delete(id: number): Promise<void>;
}