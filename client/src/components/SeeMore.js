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
            product : null,
            flag :false,
            //id which is passed in the url
            id : ""
            })

    }

    

    componentDidMount(){
    
        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`)
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

    handleButtonClick(){
        console.log(window.location.href.split("/")[4])
        axios.post(`${SERVER_HOST}/cart/${localStorage.id}/${window.location.href.split("/")[4]}`, {headers:{"lessgooooo":window.location.href.split("/")[4]}})   

        .then(res =>
        {
            console.log(res)
        }
        )
        .catch(err =>
        {
            console.log(err)
            console.log("error")
        }
        )
    }

    back(){ 

    }

    next(){ 

    }
    
   


    displayProduct()
    { return(
        <div className="SeeMore">
            <h1>Product Details</h1>
            <div>
                
                <h2>{this.state.product.title}</h2>
                {<div className ="ProdcutImage">
            {this.state.product.images.map((item) => {return(<img src={item} alt="product" />)})}
        </div>
}
                <h2>{this.state.product.brand}</h2>
                <h2>{this.state.product.rating}</h2>
                </div>
                <div>
                <h2>{this.state.product.price}</h2>
                <h2>{this.state.product.description}</h2>
                <h2>{this.state.product.category}</h2>
                <h2>{this.state.product.image}</h2>
                <button onClick={this.handleButtonClick}>Add to cart </button>
                </div>
            </div>
            )
    }

    
    


    render()
    
    {
        console.log(this.state.product)
        var temp = (window.location.href.split("/")[4])
        console.log(temp)
        var temp2 = this.props.match.params.id
        console.log(temp2)
        console.log(this.id)
        
        return (
        <>



        {this.state.flag ? this.displayProduct() : null}
            
            <Link to="/products">Back to products</Link>
        </>
        )
        
    }

}