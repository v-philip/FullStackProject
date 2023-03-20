import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            email:"",
            password:"",
            id:"",
            isLoggedIn:false,
            wasSubmittedAtLeastOnce:false,
            
        }
    }
        
   

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
        
    }

    validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
         re.test(email);
        if(!re.test(email)){
            return(
          <div>The email is not valid</div>
        )}
        else {
            }
    }

    validatePassword = (password) => {
        //regex for password
        //Minimum eight characters, at least one letter, one number and one special character:
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
         re.test(password);
        if(!re.test(password)){
            return(
          <div>password is not safe</div>
        )}
        else {
            }
    }


    
    
    handleSubmit = (e) => 
    {
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            localStorage.name = res.data.name
            localStorage.accessLevel = res.data.accessLevel
            localStorage.profilePhoto = res.data.profilePhoto                        
            localStorage.token = res.data.token
            localStorage.email = res.data.email
            localStorage.id = res.data.id
                    
            this.setState({isLoggedIn:true})
        }) 
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
    }


    render()
    {         
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Login Details are incorrect<br/></div>;
        }

        {}
        
        return (
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
                <h2>Login</h2>
                
                {this.state.isLoggedIn ? <Redirect to="/ProductPage"/> : null} 
                
                {errorMessage}
                
                <input 
                    type = "email" 
                    name = "email" 
                    placeholder = "Email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                /><br/>
                {this.validateEmail(this.state.email)}
                <input 
                    type = "password" 
                    name = "password" 
                    placeholder = "Password"
                    autoComplete="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                /><br/><br/>
                {this.validatePassword(this.state.password)}
                
                <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit}/> 
                <Link className="red-button" to={"/ProductPage"}>Cancel</Link>                                      
            </form>
        )
    }
}