import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"
import Header from "./Header"   
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
            thumbnail: ``,
            images:[],
            redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
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
            thumbnail: this.state.thumbnail,
            images: this.state.images

        }

        axios.post(`${SERVER_HOST}/products`, productObject, {headers:{"authorization":localStorage.token}})
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
        
        return (<>
        <Header/>
            <div className="form-container">
    
                {this.state.redirectToDisplayAllCars ? <Redirect to="/ProductCard"/> : null}  
                    
                {errorMessage}
                
                <form>
                    
                        <label>title</label>
                        <input ref = {(input) => { this.inputToFocus = input }} type="text" name="title" placeholder="Title" onChange={this.handleChange} />
                    

                        <lable>description</lable>
                        <input type="text" name="description"  placeholder="description" onChange={this.handleChange} />
                    

                    
                        <label>Price</label>
                        <input type="text" name="price"  placeholder="price" onChange={this.handleChange} />
                    
        
                    
                        <label>Discount Percentage</label>
                        <input type="number" name="discountPercentage"  placeholder="Discount perverntage" onChange={this.handleChange} />
                   
                    
         
                        <label>Rating</label>
                        <input type="number" name="rating" placeholder="Rating" onChange={this.handleChange} />
                    
                  
                        <label>Stock</label>
                        <input type="text" name="stock" placeholder="Stock" onChange={this.handleChange} />
                   

                        <label>Brand</label>
                        <input type="text" name="brand" placeholder="Brand" onChange={this.handleChange} />
                

                        <label>Category</label>
                        <input type="text" name="category" placeholder="category" onChange={this.handleChange} />

                   
        
                        <label>thumbnail</label>
                        <input type="text" name="thumbnail" placeholder="Thumbnail link" onChange={this.handleChange} />
              
            
                       
                        <label>images</label>
                        <input type="text" name="images"  placeholder="Image link" onChange={this.handleChange} />
               
                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
                    <Link className="red-button" to={"/ProductPage"}>Cancel</Link>
                </form>
            </div>
            </>
        )
    }
}