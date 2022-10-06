import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios';
import validator from 'validator';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        errorEmail: '',
        errorPassword: ''
    });
    const [loginUserData, setLoginUserData] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data) {
            navigate("/")
        }
    }, [])


    useEffect(() => {
        axios.get('http://localhost:5000/user').then((res) => setLoginUserData(res?.data))
    }, [])


    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        validation(name, value)
    }

    const validation = (name, value) => {
        if (name === "email") {
            if (!value) {
                setError({ ...error, errorEmail: "Please Valid Email" })
            }
            else if (!validator.isEmail(value)) {
                setError({ ...error, errorEmail: "Enter Valid Email" })
            }
            else {
                setError("")
            }
        }
        else if (name === "password") {
            if (!value) {
                setError({ ...error, errorPassword: "Please Valid Password" })
            } else {
                setError("")
            }
        }
    }

    const handelSubmit = () => {
        const loginData = loginUserData.find((item) => item.email === data.email && item.password === data.password)
        if (loginData) {
            navigate('/', { data: loginData })
            localStorage.setItem("user", JSON.stringify(loginData))
        }
        else {
            setError({ ...error, errorEmail: "Please Valid Email", errorPassword: "Please Valid Password" })
        }
    }

    return (
        <div style={{ textAlign: '-webkit-center' }}>
            <Box sx={{
                width: 350,
                height: 300,
                backgroundColor: '#F5F5F5',
                mt: 25,
                pt: 10,
                p: 5,
                autoComplete: "off"
            }}
            >
                <div style={{ height: 100 }}>
                    <TextField fullWidth sx={{ mt: 5 }} id="outlined-basic" label="Email" variant="outlined" type='email' name='email' onChange={e => onChangeValue(e)} helperText={error.errorEmail ? <span>{error.errorEmail}</span> : ""} />
                </div>
                <div style={{ height: 100 }}>
                    <TextField fullWidth sx={{ mt: 3 }} id="outlined-basic" label="Password" variant="outlined" type='password' name='password' onChange={e => onChangeValue(e)} helperText={error.errorPassword ? <span>{error.errorPassword}</span> : ""} />
                </div>
                <Button variant="contained" sx={{ mt: 3 }} onClick={() => handelSubmit()}>Login</Button>
                <br />
                <NavLink to="/Register" style={{ color: 'blue', textDecoration: 'none' }}>Register</NavLink>
            </Box>
        </div>
    )
}

export default Login;