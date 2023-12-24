import { Route, Router } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? <Home /> : <Login />}
    </div>
  );
}

export default App;
