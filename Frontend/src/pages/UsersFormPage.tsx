import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { createCustomer, createOperator } from "../api/users";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UsersFormPage: React.FC = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().required(),
        phone: yup.string().required(),
        bdate: yup.string().required(),
        cy_name: yup.string(),
        cm_name: yup.string(),
        address: yup.string(),
        c_phone: yup.string(),
        c_email: yup.string(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { kind } = useParams<{ kind: "operator" | "customer" }>();    
    const { token } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            if (kind === "operator") {
                await createOperator(token, data);
            } else {
                await createCustomer(token, data);
            }
            navigate("/users");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="form-container">
            <h2>Create User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                />
                <br />
                <p className="error-message">{errors.email?.message}</p>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                />
                <br />
                <p className="error-message">{errors.name?.message}</p>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                />
                <br />
                <p className="error-message">{errors.password?.message}</p>
                <input
                    type="text"
                    placeholder="Phone"
                    {...register("phone")}
                />
                <br />
                <p className="error-message">{errors.phone?.message}</p>
                <input
                    type="date"
                    placeholder="Birth Date"
                    {...register("bdate")}
                />
                <br />
                <p className="error-message">{errors.bdate?.message}</p>
                {kind === "customer" && (
                    <>
                        <input
                            type="text"
                            placeholder="Company Name"
                            {...register("cy_name")}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Comercial Name"
                            {...register("cm_name")}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Address"
                            {...register("address")}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Contact Phone"
                            {...register("c_phone")}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Contact Email"
                            {...register("c_email")}
                        />
                        <br />
                    </>
                )}
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default UsersFormPage;