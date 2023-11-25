import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Poll from './pages/poll';
import NewPoll from './pages/newPoll';
import Profile from './pages/profile';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home" element={<Main />}/>
      <Route path="/poll/:id" element={<Poll />}/>
      <Route path="/newPoll" element={<NewPoll />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  );
}

export default App;