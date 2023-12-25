import { useSelector } from 'react-redux';
import Home from './Home';
import Login from './Login'

export default function RootPage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <div>
            { isAuthenticated ? <Home/> : <Login/>}
        </div>
    );
}