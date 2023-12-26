import { useDispatch, useSelector } from 'react-redux';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { getAllSubscribers, getAllTemplates } from "../api/axiosConfig";
import { fetchAllSubscribers, fetchTemplates } from '../actions/actions';

export default function Home() {
    const jwtToken = useSelector(state => state.auth.jwtToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToTemplatesPage = () => {
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

    const goToSubscribersPage = () => {
        getAllSubscribers(jwtToken)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                dispatch(fetchAllSubscribers(response.data));
                navigate('/subscribers');
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
        })
    }

    return (
        <div>
            <h2>Manage Your Account</h2>
            <div className="grid-container">
                <div className="grid-item" onClick={goToSubscribersPage}>Manage Your Subscribers</div>
                <div className="grid-item" onClick={goToTemplatesPage}>Manage Your Templates</div>
                <div className="grid-item">Manage Your Subscription</div>
                <div className="grid-item">Notify Your Subscribers</div>
            </div>
        </div>
    )
}