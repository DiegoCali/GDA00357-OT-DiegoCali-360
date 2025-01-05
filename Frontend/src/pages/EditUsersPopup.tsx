import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../api/users";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function EditUsersPopup(props: any) {
    const schema = yup.object().shape({
        user_name: yup.string().required(),
        email: yup.string().required(),
        phone: yup.string().required(),
        birth_date: yup.string().required(),
        state: yup.number().required(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const { token } = useAuth();
    const [user, setUser] = useState<any>({});

    const fetchData = async () => {
        try {
            const data = await getUserById(token, props.id);
            setUser(data);
        } catch (error) {
            alert(error);
        }
    };

    const onSubmit = async (data: any) => {
        try {

            await updateUser(token, props.id, data);
            alert("User updated successfully");
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
                    <h2>Edit User</h2>
                    <div className="field">
                        <p>Name:</p>
                        <input type="text" defaultValue={user.user_name} {...register('user_name')} />
                        <p className="error-message">{errors.user_name?.message}</p>
                    </div>
                    <div className="field">
                        <p>Email:</p>
                        <input type="text" defaultValue={user.email} {...register('email')} />
                        <p className="error-message">{errors.email?.message}</p>
                    </div>
                    <div className="field">
                        <p>Phone:</p>
                        <input type="text" defaultValue={user.phone} {...register('phone')} />
                        <p className="error-message">{errors.phone?.message}</p>
                    </div>
                    <div className="field">
                        <p>Birthdate:</p>
                        <input type="text" defaultValue={user.birth_date} {...register('birth_date')} />
                        <p className="error-message">{errors.birth_date?.message}</p>
                    </div>
                    <div className="field">
                        <p>State:</p>
                        <select defaultValue={user.StateID} {...register('state')}>
                            <option value="5">Active</option>
                            <option value="6">Inactive</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button type="button" onClick={props.toggle}>Cancel</button>
                        <button type="submit">Save</button>                        
                    </div>                        
                </div>
            </form>
        </div>
    );
}