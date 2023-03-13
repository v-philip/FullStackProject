import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"

export default class SeeMore extends Component
{
    constructor(props)
    {
        super(props)
        this.state =({
            product : [],
            flag :false,
            id :""
            })

    }

    

    componentDidMount(){
    
        axios.get(`${SERVER_HOST}/products/${this.id}`,)
        .then(res => 
        {     
            this.setState({product: res.data,
                            
                            flag :true})            
        })
        .catch(err => 
        {
            // do nothing
        })
    }

    displayProduct()
    { return(
        <div>
                <h1>Product Details</h1>
                <h2>{this.state.product.title}</h2>
                <h2>{this.state.product.brand}</h2>
                <h2>{this.state.product.rating}</h2>
                <h2>{this.state.product.price}</h2>
                <h2>{this.state.product.description}</h2>
                <h2>{this.state.product.category}</h2>
                <h2>{this.state.product.image}</h2>
                <button>Add to cart </button>
            </div>
            )
    }

    
    


    render()
    
    {
        console.log(this.state.product)
        var temp = (window.location.href.split("/")[4])
        console.log(temp)
        this.id = temp
        return (
        <>

        {this.state.flag ? this.displayProduct() : null}
            
            <Link to="/products">Back to products</Link>
        </>
        )
        
    }

}