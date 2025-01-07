import Tops from "../components/Tops";
import Actives from "../components/Actives";

export default function DashboardPage() {
    return (
        <div className="dashboard">
            <div className="actives-container">
                <Actives />
            </div>
            <div className="tops-container">
                <div>
                <Tops kind="products" />
                </div>
                <div>
                <Tops kind="clients" />
                </div>
            </div>
        </div>

    );
}