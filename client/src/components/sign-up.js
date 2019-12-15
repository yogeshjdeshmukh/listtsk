import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components';


class Signup extends Component {
	constructor(props) {
        super(props)
    
        this.onChangefirstname = this.onChangefirstname.bind(this);
        this.onChangelastname = this.onChangelastname.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
             firstname: '',
             lastname: '',
             email: '',
             password: '',
             redirectTo: false
        }
    }
	onChangefirstname(e) {
        this.setState({
          firstname: e.target.value
        })
      }
      onChangelastname(e) {
        this.setState({
          lastname: e.target.value
        })
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
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.email)
		event.preventDefault()
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
          }
          console.log(user)
		//request to server to add a new username/password
		axios.post('http://localhost:8080/register', user)
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
                    console.log('successful signup')
					this.setState({ //redirect to login page
                        redirectTo: true
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
    const { redirect } = this.state.redirectTo;

     if (redirect) {
       return <Redirect to='/login'/>;
     }
	return (
        <SigninWrapper>
            <div class="wrapper">
    <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>       
      <h2 className="form-signin-heading">Register Yourself</h2>
      <input type="text" 
      className="form-control"
       name="firstname" 
       placeholder="First Name"
       value={this.state.firstname}
        onChange={this.onChangefirstname}
        required="" 
        autofocus="" />

      <input type="text" 
      className="form-control"
       name="lastname" 
       placeholder="Last Name"
       value={this.state.lastname}
        onChange={this.onChangelastname}
        required="" 
        autofocus="" />

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
      <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>   
    </form>
  </div>
      </SigninWrapper>
	)
}
}

export default Signup


const SigninWrapper = styled.div`
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
