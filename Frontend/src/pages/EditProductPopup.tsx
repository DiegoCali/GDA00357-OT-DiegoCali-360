import { useAuth } from "../store/authStore";
import { getProductById, updateProduct } from "../api/products";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function EditProductPopup(props: any) {
    const schema = yup.object().shape({
        name: yup.string().required(),
        brand: yup.string().required(),
        code: yup.string().required(),
        stock: yup.number().required(),
        price: yup.number().required(),
        picture: yup.string().required(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });    
    const { token } = useAuth();
    const [product, setProduct] = useState<any>({});

    const fetchData = async () => {
        try {
            const data = await getProductById(token, props.id);
            setProduct(data);
        } catch (error) {
            alert(error);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            await updateProduct(token, props.id, data);
            alert("Product updated successfully.");
            props.toggle();
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="popup">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="popup-inner">
                    <h2>Edit Product</h2>
                    <div className="field">
                        <p>Name:</p>
                        <input type="text" defaultValue={product.product_name} {...register('name')} />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>
                    <div className="field">
                        <p>Brand:</p>
                        <input type="text" defaultValue={product.brand} {...register('brand')} />
                        <p className="error-message">{errors.brand?.message}</p>
                    </div>
                    <div className="field">
                        <p>Code:</p>
                        <input type="text" defaultValue={product.code} {...register('code')} />
                        <p className="error-message">{errors.code?.message}</p>
                    </div>
                    <div className="field">
                        <p>Stock:</p>
                        <input type="number" defaultValue={product.stock} {...register('stock')} />
                        <p className="error-message">{errors.stock?.message}</p>
                    </div>
                    <div className="field">
                        <p>Price:</p>
                        <input type="text" defaultValue={product.price} {...register('price')} />
                        <p className="error-message">{errors.price?.message}</p>
                    </div>
                    <div className="field">
                        <p>Picture:</p>
                        <input type="text" defaultValue={product.picture} {...register('picture')} />
                        <p className="error-message">{errors.picture?.message}</p>
                    </div>
                    <div>
                        <button type="button" onClick={props.toggle}>Cancel</button>
                        <button type="submit">Save</button>                        
                    </div>                        
                </div>
            </form>
        </div>
    );
}