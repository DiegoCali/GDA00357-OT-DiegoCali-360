import { useAuth } from "../store/authStore";

export default function CartPage() {
    const { token, role, cart } = useAuth();    

    return (
        <div>                                
            {token ? (                    
                <div>
                    <h1>Cart</h1>
                    <div className="CartContainer">
                        {
                            role === 2 && (
                                <div>
                                    <h2>Products</h2>
                                    <div className="ProductContainer">
                                    {cart.map((product) => (
                                        <p>{product}</p>
                                    ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>                                                                          
            ) : (
                <span>You are not logged in.</span>
            )}            
        </div>   
    );
}