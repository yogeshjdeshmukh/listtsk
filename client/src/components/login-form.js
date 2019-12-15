import React, { Component } from 'react'
import styled from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom'
import {withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectTo: null
        }
        this.onChangeemail = this.onChangeemail.bind(this)
        this.onChangepassword = this.onChangepassword.bind(this)
    }

    onChangeemail(e) {
        this.setState({
          email: e.target.value
        })
      }  

      onChangepassword(e) {
        this.setState({
          password: e.target.value
        })
      }  

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('http://localhost:8080/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                
                if (response.status === 200) {
                    localStorage.setItem('usertoken', response.data)
                    this.props.history.push('/courses')
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }

    render() {
            return (
                <LoginWrapper>
        <div class="wrapper">
    <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>       
      <h2 className="form-signin-heading">Please login</h2>
      <input type="text" 
      className="form-control"
       name="email" 
       placeholder="Email Address"
       value={this.state.email}
        onChange={this.onChangeemail}
        required="" 
        autofocus="" />
      <input type="password" 
      className="form-control"
       name="password" 
       placeholder="Password" 
       value={this.state.password}
      onChange={this.onChangepassword}
       required=""/>      
      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
    </form>
  </div>
            </LoginWrapper>
        )
        
    }
}

export default withRouter(LoginForm);


const LoginWrapper = styled.div`
@import "bourbon";

body {
	background: #eee !important;	
}

.wrapper {	
	margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);  

  .form-signin-heading,
	.checkbox {
	  margin-bottom: 30px;
	}

	.checkbox {
	  font-weight: normal;
	}

	.form-control {
	  position: relative;
	  font-size: 16px;
	  height: auto;
	  padding: 10px;
		@include box-sizing(border-box);

		&:focus {
		  z-index: 2;
		}
	}

	input[type="text"] {
	  margin-bottom: -1px;
	  border-bottom-left-radius: 0;
	  border-bottom-right-radius: 0;
	}

	input[type="password"] {
	  margin-bottom: 20px;
	  border-top-left-radius: 0;
	  border-top-right-radius: 0;
	}
}

`;
