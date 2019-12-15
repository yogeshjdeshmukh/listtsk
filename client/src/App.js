import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Login from './components/login-form';
import Register from './components/sign-up';
import Modal from './components/Modal';



class App extends Component {
    render(){
  return (
      <div>
    <Navbar></Navbar>
    <Switch>
    <Route exact path="/"  component={Default}></Route>
    <Route path="/courses" component={ProductList}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
       
    </Switch>
    <Modal></Modal>
    </div>
    );
}
}

export default App;
