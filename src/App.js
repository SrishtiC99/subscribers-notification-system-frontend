import { Route, Routes } from 'react-router-dom';
import './App.css';
import TemplatesPage from './components/TemplatesPage';
import RootPage from './components/RootPage';
import Subscribers from './components/Subscribers';
import BillingPage from './components/BillingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RootPage/>} />
        <Route path='/templates' element={<TemplatesPage />} />
        <Route path='/subscribers' element={<Subscribers />} />
        <Route path='/billing' element={<BillingPage />} />
      </Routes>
    </div>
  );
}

export default App;
