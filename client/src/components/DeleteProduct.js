import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteProduct extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirectToDisplayAllCars:false
        }
    }
    
    
    componentDidMount() 
    {   
        axios.delete(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers: {Authorization: localStorage.token}})
        .then(res => 
        {            
            this.setState({redirectToDisplayAllCars:true})            
        })
        .catch(err =>
        {
            // Do nothing
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirectToDisplayAllCars ? <Redirect to="/ProductCard"/> : null}                      
            </div>
        )
    }
}