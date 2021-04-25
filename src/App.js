import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Histories from './components/Histories/Histories';
import Login from './components/Login'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { doInitProducts } from './actions/products';
import { doInitCart } from './actions/cart';
import { doInitAuth } from './actions/auth';
import {doInitHistories} from './actions/histories'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then(res=>dispatch(doInitProducts(res.data)))
    .catch(err=>console.log(err))

    axios.get("http://localhost:5000/cart")
    .then(res=>dispatch(doInitCart(res.data)))
    .catch(err=>console.log(err))

    axios.get("http://localhost:5000/auth")
    .then(res=>dispatch(doInitAuth(res.data)))
    .catch(err=>console.log(err))

    axios.get("http://localhost:5000/histories")
    .then(res=>dispatch(doInitHistories(res.data)))
    .catch(err=>console.log(err))
  })

  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>

            <Route exact path="/products">
              <Products/>
            </Route>

            <Route exact path="/cart">
              <Cart/>
            </Route>

            <Route exact path="/histories">
              <Histories/>
            </Route>

            <Route exact path="/login">
              <Login/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
