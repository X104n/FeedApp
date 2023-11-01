import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home" element={<Main />}/>
    </Routes>
  );
}

export default App;