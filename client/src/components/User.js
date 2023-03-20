import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import Header from "./Header"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import ProductCard from "./ProductCard"
import Logout from "./Logout"

export default class User extends Component
{
    constructor(props)
    {
        super(props)
        
            this.state={
                profilePhoto: null,
                name: localStorage.name,
                email: localStorage.email,
                password: "",
                confirmPassword: "",
                editProfile: false,
                flag : true,

            }
        
    }

    handleFileChange = (e) => 
    {
        this.setState({selectedFile: e.target.files[0],flag : false})
        
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()  
        if(this.state.selectedFile)
        {
            formData.append("profilePhoto", this.state.selectedFile, this.state.selectedFile.name)
        }    
        axios.put(`${SERVER_HOST}/users/photo/${localStorage.id}`, formData, {headers: {"Content-type": "multipart/form-data"}})
        .then(res => 
        {     
            localStorage.name = res.data.name
            localStorage.accessLevel = res.data.accessLevel
            localStorage.profilePhoto = res.data.profilePhoto                    
            localStorage.token = res.data.token
                    
            this.setState({isRegistered:true})               
        })   
        .catch(err =>
        {
            this.setState({wasSubmittedAtLeastOnce: true})            
        })
    }

    render()
        {
        return (<>
        <Header/>
            <div className="user-cards">
                <div className="user info">
                    <img src={`data:;base64,${localStorage.profilePhoto}`}alt = "" />
                    <h1>Username</h1>
                    <h2>{localStorage.name}</h2>
                    <h1>Email</h1>
                    <h2>{localStorage.email}</h2>
                    <input          
                    name = "profilePhoto"    
                    type = "file"                    
                    onChange = {this.handleFileChange}
                    
                />
                <button value ="submit" onClick = {this.handleSubmit} >  </button>
                <div className="logout"><Logout /></div>
                <br/><br/>

                </div>
                <div className="infomation">

                </div>
            </div>

            </>
        )
    }   
}