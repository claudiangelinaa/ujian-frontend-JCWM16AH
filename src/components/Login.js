import { Button, Table, TableBody, TableHead, TextField } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { doToggleLogin } from '../actions/auth'

const Login = () => {
    const dispatch=useDispatch()
    const auth = useSelector(state => state.authReducer)

    const [email,setEmail]= useState('')
    const [password,setPassword] =useState('')
    const history = useHistory()

    const handleLogin= ()=>{
        if(password.length<6){
            alert(`Password terlalu pendek`)
            return
        }
        if(!/\d/.test(password)){
            alert(`Password harus mengandung angka`)
            return
        }
        let authStatus = {
            isLogin:true,
            loginEmail: email
        }
        axios.post("http://localhost:5000/login",{email,password})
        .then(res=>{
            dispatch(doToggleLogin(authStatus))
            axios.post("http://localhost:5000/auth",authStatus)
            localStorage.setItem('access_token',res.data.accessToken)
            history.push("/")
        })
        .catch(err=>{
            console.log(err.response)
            if(err.response.data === 'Cannot find user'){
                axios.post("http://localhost:5000/register",{email,password})
                .then(res=>{
                    dispatch(doToggleLogin(authStatus))
                    axios.post("http://localhost:5000/auth",authStatus)
                    localStorage.setItem('access_token',res.data.accessToken)
                    history.push("/")
                })
            }
        })
    }

    return (
        <div>
            <Table>
                <TableHead>
                </TableHead>
                <TableBody>
                    
            <h2>Login</h2>

            <h5>User Email</h5>
            <TextField label="User Email" variant="outlined" type="email" onChange={e=>setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <TextField type="password" variant="outlined" onChange={e=>setPassword(e.target.value)}
            />
                </TableBody>

            <Button variant="contained" color="secondary" onClick={handleLogin}>Log In</Button>
            </Table>

        </div>
    )
}

export default Login;
