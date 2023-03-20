import React, {Component} from "react"
import {Link} from "react-router-dom"
import {Redirect} from "react-router-dom"
import axios from "axios"
import Header from "./Header"
import ProductCard from "./ProductCard"
import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class ProductsPage extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[],
            selectedProducts: [],
            category:[],
            selectedCategory:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/products`)
        .then(res => 
        { 
            this.setState({products: res.data,
            selectedProducts: res.data})
            let cat = this.state.products.map(product => product.category)
                    cat = [...new Set(cat.flat(1))].sort()
                    cat.unshift("All")
                    this.setState({category: cat})
                                                     
        })
        .catch(err =>
        {
            // do nothing
        })
    }

    handleSearchChange = e => {
        
        let x = this.state.searchBy
        
            console.log(x)
        console.log(this.state.attractions)
        if (!(e.target.value === ""))
        {
            this.setState({ selectedAttractions: this.state.attractions.filter(finder => finder.name.toUpperCase().includes(e.target.value.toUpperCase())) })
            
        }
        else 
            this.setState({ selectedAttractions: this.state.attractions })
    }

    handleFilterChange = e => {

        if(e === null){
            this.setState({ selectedAttractions: this.state.products })
            return
        }

        let selectedCat = e.target.value
        if (selectedCat==="All")
        {
            this.setState({ selectedProducts: this.state.products })
        }
        else
        {
            if (this.state.selectedCategory.includes(selectedCat)){
                this.state.selectedCategory.splice(this.state.selectedCategory.indexOf(selectedCat), 1)
            }
            else
            {
                this.state.selectedCategory.push(selectedCat)
            }
            this.setState({ selectedProducts: this.state.products.filter(product => this.state.selectedCategory.includes(product.category)) })
        }
    }


    handleSearchChange = e => {
        if (e.target.value === "")
        {
            this.setState({ selectedProducts: this.state.products })
        }
        else
        {
            this.setState({ selectedProducts: this.state.products.filter(product => product.title.toUpperCase().includes(e.target.value.toUpperCase())|| product.brand.toUpperCase().includes(e.target.value.toUpperCase())) })
        }
    }

    handelSortChange = e => {
        if (e.target.value === "Price: Low to High")
        {
            this.setState({ selectedProducts: this.state.selectedProducts.sort((a, b) => a.price - b.price) })
        }
        else if (e.target.value === "Price: High to Low")
        {
            this.setState({ selectedProducts: this.state.selectedProducts.sort((a, b) => b.price - a.price) })
        }
        else if (e.target.value === "Name: A to Z")
        {
            this.setState({ selectedProducts: this.state.selectedProducts.sort((a, b) => a.title.localeCompare(b.title)) })
        }
        else if (e.target.value === "Name: Z to A")
        {
            this.setState({ selectedProducts: this.state.selectedProducts.sort((a, b) => b.title.localeCompare(a.title)) })
        }

    }


  
    render() 
    {   console.log(this.state.selectedCategory)
        return (  <>  
            <Header />
            <div className="search-bar">
                <input type="text" placeholder="Search..." onChange={this.handleSearchChange}/>
            </div>
            
            <div className="sort-bar">
                <select onChange={this.handelSortChange}>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Name: A to Z">Name: A to Z</option>
                    <option value="Name: Z to A">Name: Z to A</option>
                </select>
            </div>
            
            <div className="WholePage">
                <div className="category">
                    <ul>{this.state.category.map((cat) =><li> 
                        <button onClick={this.handleFilterChange} value = {cat}>{cat}</button>
                        
                        {/* <label value = {cat} className="container">{cat}
                                                                <input type="checkbox" onClick={this.handleFilterChange} value = {cat}/>
                                                                <span className="checkmark"></span>
                                                            </label> */}
                                                          </li>)}
                        
                    </ul>
                </div>
                    
                
                
                <div className="card-container">
                 <ProductCard products={this.state.selectedProducts}/>
                    {/* <CarTable products={this.state.products} />  */}
                        
                    {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                        ? <div className="add-new-car">
                            <Link className="blue-button" to={"/AddProduct"}>Add New prodcut</Link>
                          </div>
                        : null
                    }
                </div> 
            </div> 
            </>
        )
    }
}