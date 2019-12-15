import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'



class Navbar extends Component {

    constructor(props) {
        super(props)
    }

    logout(e) {
        
        console.log("length "+jwt_decode(localStorage.usertoken).length)
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
      }


    render() {
        let link;
        if(localStorage.usertoken){
        let token = jwt_decode(localStorage.usertoken);
            link = <section className="navbar-section">
            <Link to="/courses" className="btn btn-link">
        <span className="text-secondary">courses</span>
        </Link>
        <Link to="/cart" className="btn btn-link text-secondary ml-auto">
        <span className="text-secondary">cart</span>
        </Link>
            <Link to="#" className="btn btn-link text-secondary" onClick={this.logout.bind(this)}>
                                <span className="text-secondary">logout</span></Link></section>;
    }
        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {localStorage.usertoken ? (
                            <div>
                                 { link }
                                </div>

                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">login</span>
				                    </Link>
                                    <Link to="/register" className="btn btn-link">
                                    <span className="text-secondary">sign up</span>
			                    	</Link>
                                </section>
                            )}
                    </div>
                </header>
            </div>

        );

    }
}

export default withRouter(Navbar);