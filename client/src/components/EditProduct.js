import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

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
            images: ``,
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
            <div className="form-container">
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/ProductCard"/> : null}  
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="model">
                        <Form.Label>title</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="model" value={this.state.title} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="year">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Discount Percentage</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.discountPercentage} onChange={this.handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="colour">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.rating} onChange={this.handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="colour">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/ProductPage"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}