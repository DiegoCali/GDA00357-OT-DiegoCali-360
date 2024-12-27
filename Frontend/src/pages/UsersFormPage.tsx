import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { createCustomer, createOperator } from "../api/users";

const UsersFormPage: React.FC = () => {
    const { kind } = useParams<{ kind: "operator" | "customer" }>();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [bdate, setBdate] = useState("");
    const [cy_name, setCyName] = useState("");
    const [cm_name, setCmName] = useState("");
    const [address, setAddress] = useState("");
    const [c_phone, setCPhone] = useState("");
    const [c_mail, setCMail] = useState("");
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (kind === "operator") {
            await createOperator(token, email, name, password, phone, bdate);
        } else {
            await createCustomer(token, email, name, password, phone, bdate, cy_name, cm_name, address, c_phone, c_mail);
        }
        navigate("/users");
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
                <br />
                <input
                    type="date"
                    placeholder="Birth Date"
                    value={bdate}
                    onChange={(event) => setBdate(event.target.value)}
                />
                <br />
                {kind === "customer" && (
                    <>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={cy_name}
                            onChange={(event) => setCyName(event.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Comercial Name"
                            value={cm_name}
                            onChange={(event) => setCmName(event.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Contact Phone"
                            value={c_phone}
                            onChange={(event) => setCPhone(event.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Contact Email"
                            value={c_mail}
                            onChange={(event) => setCMail(event.target.value)}
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