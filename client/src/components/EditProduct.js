import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"
import Header from "./Header";

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            title: ``,
            description: ``,
            price: ``,
            discountPercentage: ``,
            rating: ``,
            stock: ``,
            brand: ``,
            category: ``,
            thumnail: ``,
            images:[],
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                title: res.data.title,
                description: res.data.description,
                price: res.data.price,  
                discountPercentage: res.data.discountPercentage,
                rating: res.data.rating,
                stock: res.data.stock,
                brand: res.data.brand,
                category: res.data.category,
                thumnail: res.data.thumnail,
                images: res.data.images
            })            
        })
        .catch(err => 
        {
            // do nothing
        })
    }


    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const productObject = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            discountPercentage: this.state.discountPercentage,
            rating: this.state.rating,
            stock: this.state.stock,
            brand: this.state.brand,
            category: this.state.category,
            thumnail: this.state.thumnail,
            images: this.state.images

        }

        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, productObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {             
            this.setState({redirectToDisplayAllCars:true})
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
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        } 
        
        return (
            <>
        <Header />
            <div className="edit-form-container">
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/ProductCard"/> : null}  
                    
                {errorMessage}
                
                <form className="editForm">
                    
                        <label>Title</label>
                        <input ref = {(input) => { this.inputToFocus = input }} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                   
                   
                        <label>Description</label>
                        <textarea type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    

                    
                        <label>Price</label>
                        <input type="text" name="Price" value={this.state.price} onChange={this.handleChange} />
                  
        
                 
                        <label>Discount Percentage</label>
                        <input type="text" name="discountPercentage" value={this.state.discountPercentage} onChange={this.handleChange} />
                   
                    
                    
                        <label>Rating</label>
                        <input type="text" name="Rating" value={this.state.rating} onChange={this.handleChange} />
                  
                    
             
                        <label>Stock</label>
                        <input type="text" name="stock" value={this.state.description} onChange={this.handleChange} />
                 

                 
                        <label>Brand</label>
                        <input type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                 

                
                        <label>Category</label>
                        <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
                 
                   

                        <label>thumbnail</label>
                        <input type="text" name="colour" value={this.state.thumbnail} onChange={this.handleChange} />
                    
            
               
                        <label>images</label>
                        <input type="text" name="colour" value={this.state.images} onChange={this.handleChange} />
                  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/ProductPage"}>Cancel</Link>
                </form>
            </div>
            </>
        )
    }
}