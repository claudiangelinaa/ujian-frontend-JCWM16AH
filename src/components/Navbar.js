import { AppBar, Badge, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { doToggleLogin } from '../actions/auth';
import axios from 'axios'

const Navbar = () => {
    const auth = useSelector(state => state.authReducer)
    const cart = useSelector(state => state.cartReducer)
    const dispatch=useDispatch()

    const handleLogout= ()=>{
        let newLoginStatus={
            isLogin:false,
            loginEmail:''
        }

        dispatch(doToggleLogin(newLoginStatus))
        axios.post("http://localhost:5000/auth", newLoginStatus)
    }
    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Button component={Link} to="/">Home</Button>
                    <Button component={Link} to="/products">Products</Button>
                    { auth.isLogin ? (
                        <>
                    <Badge badgeContent={cart.length} color="secondary">
                        <Button component={Link} to="/cart">Cart</Button>

                    </Badge>
                    <Button component={Link} to="/histories">Histories</Button>
                        <Button onClick={handleLogout}>Logout</Button>
                        {auth.loginEmail}
                        </>
                    ):
                    (
                    <Button component={Link} to="/login">Login</Button>
                    )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
