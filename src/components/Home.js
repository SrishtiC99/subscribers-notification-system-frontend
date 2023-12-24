import { useDispatch, useSelector } from 'react-redux';
import '../css/Home.css';

export default function Home() {
    const jwtToken = useSelector(state => state.auth.jwtToken);

    return (
        <div>
            <h2>Manage Your Account</h2>
            <p>Jwt Token: { jwtToken }</p>
            <div className="grid-container">
                <div className="grid-item">Manage Your Subscribers</div>
                <div className="grid-item">Manage Your Templates</div>
                <div className="grid-item">Manage Your Subscription</div>
                <div className="grid-item">Notiy Your Subcribers</div>
            </div>
        </div>
    )
}