import { useAuth } from "../store/authStore";

export default function MainPage() {
    const { token } = useAuth();

    return (
        <div>
            <h1>Main Page</h1>            
            <p>
                {token ? (
                    <span>You are logged in.</span>
                ) : (
                    <span>You are not logged in.</span>
                )}
            </p>
        </div>   
    );
}