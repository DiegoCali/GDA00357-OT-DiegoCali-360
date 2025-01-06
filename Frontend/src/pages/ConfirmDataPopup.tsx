import { useAuth } from "../store/authStore";
import { getCustomerData } from "../api/users";
import { createOrder } from "../api/orders";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ConfirmDataPopup(props: any) {
    const schema = yup.object().shape({        
        name: yup.string().required(),
        delivery: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().required(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { token, customer_id, user_id, cart, clearCart } = useAuth();
    const [customerData, setCustomerData] = useState<any>({});

    const fetchData = async () => {
        try {
            const data = await getCustomerData(token, customer_id);
            setCustomerData(data);
        } catch (error) {
            alert(error);
        }
    };

    const onSubmit = async (data: any) => {
        try {
            // Do something with the data
            data.user_id = user_id;            
            data.products = cart;
            await createOrder(token, data);
            alert("Order created successfully.");
            clearCart();
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
                    <h2>Confirm your data</h2>                    
                    <div className="field">
                        <p>comercial_name Name:</p>
                        <input type="text" defaultValue={customerData.comercial_name} {...register('name')} />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>
                    <div className="field">
                        <p>Address:</p>
                        <input type="text" defaultValue={customerData.delivery_address} {...register('delivery')} />
                        <p className="error-message">{errors.delivery?.message}</p>
                    </div>
                    <div className="field">
                        <p>Phone:</p>
                        <input type="text" defaultValue={customerData.phone} {...register('phone')}/>
                        <p className="error-message">{errors.phone?.message}</p>
                    </div>
                    <div className="field">
                        <p>Email:</p>
                        <input type="text" defaultValue={customerData.email} {...register('email')} />
                        <p className="error-message">{errors.email?.message}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <button type="button" onClick={props.toggle}>Cancel</button>
                        <button type="submit">Confirm</button>
                    </div>                        
                </div>
            </form>
        </div>
    );
};