import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Navbar() {
  const location = useLocation()
  const navigation = useNavigate()
  const logOut = () => {
    localStorage.removeItem('user');
    navigation('/login')
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'blue', display: 'flex' }}>
      <Box component="div" sx={{ width: '90%' ,textAlign:'center' }}>
        <Link to='/' style={{ textDecoration: 'none', color: '#ffffff' }}><Tab label="Home" /></Link>
        <Link to='/about' style={{ textDecoration: 'none', color: 'white' }}><Tab label="About" /></Link>
      </Box>
      <Box component="div" sx={{ width: '10%' }}>
        {location.pathname === '/login' ? <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}><Tab label="Login" /></Link> :
          <Button onClick={logOut} style={{ color: 'white', opacity: 0.6, marginTop: '5px' }}>Logout</Button>}
      </Box>
    </Box>
  );
}
