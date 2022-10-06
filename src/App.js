import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import Register from './Component/Register';
import ProtectedRoutes from './ProtectedRoutes';
import Navbar from './Component/Navbar';
import About from './Component/About';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<ProtectedRoutes />} >
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
