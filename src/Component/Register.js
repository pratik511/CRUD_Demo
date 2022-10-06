import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios';
import validator from 'validator';

const Register = () => {
    console.log("Email", validator.isEmail("Pratik@email.com"));
    const [data, setData] = useState({
        name: '',
        number: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState({
        errorName: '',
        errorNumber: '',
        errorEmail: '',
        errorPassword: '',
    });
    console.log("error", error);


    const navigate = useNavigate()
    console.log(data);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data) {
            navigate("/")
        }
    }, [])

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        validation(name, value)
    }

    const patternName = /[^A-Za-z_./ /]/;
    const validation = (name, value) => {
        if (name === "name") {
            if (!value) {
                setError({ ...error, errorName: "Please Enter Name" })
            }
            else if (value.match(patternName)) {
                setError({ ...error, errorName: "Name Not Allow Number & Symbol!" })
            }
            else {
                setError({ ...error, errorName: "" })
            }
        }
        else if (name === "number") {
            if (!value) {
                setError({ ...error, errorNumber: "Please Enter Number" })
            }
            else if (value.length !== 10) {
                setError({ ...error, errorNumber: "Enter Valid Number" })
            }
            else {
                setError({ ...error, errorNumber: "" })
            }
        }
        else if (name === "email") {
            if (!value) {
                setError({ ...error, errorEmail: "Please Enter Email" })
            }
            else if (!validator.isEmail(value)) {
                setError({ ...error, errorEmail: "Enter Valid Email" })
            }
            else {
                setError({ ...error, errorEmail: "" })
            }
        }
        else if (name === "password") {
            if (!value) {
                setError({ ...error, errorPassword: "Please Enter Password" })
            } else {
                setError({ ...error, errorPassword: "" })
            }
        }
    }

    const handelSubmit = async () => {
        let status = true
        let errorNameMsg = ""
        let errorNumberMsg = ""
        let errorEmailMsg = ""
        let errorPasswordMsg = ""
        if (data.name === "") {
            errorNameMsg = "Please Enter Name"
            status = false
        }
        if (data.number === "") {
            errorNumberMsg = "Please Enter Number"
            status = false
        }
        if (data.number && data.number.length !== 10) {
            errorNumberMsg = "Enter Valid Number"
            status = false
        }
        if (data.email === "") {
            errorEmailMsg = "Please Enter Email"
            status = false
        }
        if (data.password === "") {
            errorPasswordMsg = "Please Enter Password"
            status = false
        }
        if (status) {
            await axios.post('http://localhost:5000/user', data)
            navigate('/login')
        } else {
            setError({
                errorName: errorNameMsg,
                errorNumber: errorNumberMsg,
                errorEmail: errorEmailMsg,
                errorPassword: errorPasswordMsg,
            })
        }
    }

    return (
        <div style={{ textAlign: '-webkit-center' }}>
            <Box
                sx={{
                    width: 350,
                    height: 400,
                    backgroundColor: '#F5F5F5',
                    mt: 15,
                    pt: 10,
                    p: 5,
                    autoComplete: "off"
                }}
            >
                <div style={{ height: 80 }}>
                    <TextField fullWidth sx={{ mt: 0.5 }} id="outlined-basic" label="Name" variant="outlined" type='text' name='name' value={data.name} onChange={e => onChangeValue(e)} helperText={error.errorName ? <span>{error.errorName}</span> : ""} />
                </div>
                <div style={{ height: 80 }}>
                    <TextField fullWidth sx={{ mt: 1 }} id="outlined-basic" label="Number" variant="outlined" type='number' name='number' value={data.number} onChange={e => onChangeValue(e)} helperText={error.errorNumber ? <span>{error.errorNumber}</span> : ""} />
                </div>
                <div style={{ height: 80 }}>
                    <TextField fullWidth sx={{ mt: 1 }} id="outlined-basic" label="Email" variant="outlined" type='email' name='email' value={data.email} onChange={e => onChangeValue(e)} helperText={error.errorEmail ? <span>{error.errorEmail}</span> : ""} />
                </div>
                <div style={{ height: 80 }}>
                    <TextField fullWidth sx={{ mt: 1 }} id="outlined-basic" label="Password" variant="outlined" type='password' name='password' value={data.password} onChange={e => onChangeValue(e)} helperText={error.errorPassword ? <span>{error.errorPassword}</span> : ""} />
                </div>
                <Button variant="contained" sx={{ mt: 2.5, width: 150, fontSize: 15 }} onClick={handelSubmit}>Register</Button>
                <br />
                <NavLink to="/Login" style={{ color: 'blue', textDecoration: 'none' }}>Login</NavLink>

            </Box>
        </div>
    )
}

export default Register;