import { useDispatch, useSelector } from 'react-redux';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { getAllTemplates } from "../api/axiosConfig";
import { fetchTemplates } from '../actions/actions';

export default function Home() {
    const jwtToken = useSelector(state => state.auth.jwtToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnClick = () => {
        getAllTemplates(jwtToken)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                dispatch(fetchTemplates(response.data));
                navigate('/templates');
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    return (
        <div>
            <h2>Manage Your Account</h2>
            <p>Jwt Token: { jwtToken }</p>
            <div className="grid-container">
                <div className="grid-item">Manage Your Subscribers</div>
                <div className="grid-item" onClick={handleOnClick}>Manage Your Templates</div>
                <div className="grid-item">Manage Your Subscription</div>
                <div className="grid-item">Notiy Your Subcribers</div>
            </div>
        </div>
    )
}