import { Button } from '@material-ui/core'
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>Welcome to my ecommerce</h2>
            <Button variant="contained" component={Link} to="/products">See all products</Button>
        </div>
    )
}

export default Home
