import React, {Component} from "react"
import {Link} from "react-router-dom"
import {Redirect} from "react-router-dom"
import axios from "axios"

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

  
    render() 
    {   console.log(this.state.selectedCategory)
        return (           
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
                    
                {
                    localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                    ? <>
                        {
                            localStorage.profilePhoto !== "null" 
                             ? //<img onClick={<Redirect to="/User"/>}id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                            
                            <Link to="/User"><img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/></Link>
                            : null
                        }                        
                        
                        </>
                    : <div>
                        {/* <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>  
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>   */}
                        <br/><br/><br/></div>
                }
                
                <div className="card-container">
                 <ProductCard products={this.state.selectedProducts}/>
                    {/* <CarTable products={this.state.products} />  */}
                        
                    {
                        localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                        ? <div className="add-new-car">
                            <Link className="blue-button" to={"/AddCar"}>Add New Car</Link>
                          </div>
                        : null
                    }
                </div> 
            </div> 
        )
    }
}