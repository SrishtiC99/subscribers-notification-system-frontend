import '../css/Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const goToTemplatesPage = () => {
        navigate('/templates');
    }

    const goToSubscribersPage = () => {
        navigate('/subscribers');
    }

    const goToBillingPage = () => {
        navigate('/billing');
    }

    return (
        <div>
            <h2>Manage Your Account</h2>
            <div className="grid-container">
                <div className="grid-item" onClick={goToSubscribersPage}>Manage Your Subscribers</div>
                <div className="grid-item" onClick={goToTemplatesPage}>Manage Your Templates</div>
                <div className="grid-item" onClick={goToBillingPage}>Manage Your Subscription</div>
                <div className="grid-item">Notify Your Subscribers</div>
            </div>
        </div>
    )
}