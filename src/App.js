import { Route, Routes } from 'react-router-dom';
import './App.css';
import TemplatesPage from './components/TemplatesPage';
import RootPage from './components/RootPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<RootPage/>} />
        <Route path='/templates' element={<TemplatesPage/>} />
      </Routes>
    </div>
  );
}

export default App;
