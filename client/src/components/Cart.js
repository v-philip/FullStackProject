import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"
import ProdcutCard from "./ProductCard"
// import cart from "../../../server/models/cart"

export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state={
            cart:[],
            products:[],
            product:[],
            productIds:[],
            quantity:[],
            total : 0,
            individualTotal: [],
            loaded: false,
            test:"",
            prod: {}
        }
    }

    componentDidMount(){
        
        axios.get(`${SERVER_HOST}/cart/${localStorage.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                cart: res.data
            })
            var formData = new FormData();
            let product = this.state.cart.product  
            this.setState({product: product})
            this.state.product.map((item) => { this.setState((prevState) => ({
                quantity: prevState.quantity.concat(item.quantity),
                productIds: prevState.productIds.concat(item.productId)
              }))
                // formData.append("item", item.productId
                })
            var formData = new FormData();
            formData.append(plsWork())
            // formData.append("1", this.state.productIds[1])
            // formData.append("2", this.state.productIds[2])
            this.state.productIds.map((item) => {formData.set(item, item)})
            
            var temp1 = 0;     
            this.setState({prod: formData})
            axios.get(`${SERVER_HOST}/products/multi/id`,formData )
            .then(res =>{
            this.setState({
                products: res.data,
                test: "hello"
            })
            })
            .catch(err =>
            {
                // do nothing
            })                                                      
            temp1 = formData.length
            console.log(temp1)
            this.hello()
            this.setState({loaded: true});
        })
        .catch(err => 
        {
            // do nothing
        })

        function plsWork(){
            var formData = new FormData();
            this.state.productIds.map((item) => {formData.append(item, item)})
            return formData
        }

        
    
    

       
        //   var displayProduct =
        //         <div>
        //             {this.state.products.map((item, iter) => { 
        //                 return(
        //                     <div>
        //                         <h1>{item.title}</h1>
        //                         <h2>{item.brand}</h2>
        //                         <h2>{item.rating}</h2>
        //                         <h2>{item.price}</h2>
        //                         <h2>{this.state.quantity[iter]}</h2>
        //                         <h2>{this.state.individualTotal[iter]}</h2>{iter++}
        //                     </div>
        //                 )
        //             })} 
        //             <h2>total</h2>
        //             <p>{this.state.total}</p>
        //         </div>  
        //         if(this.state.loaded){
        //             this.displayProduct = displayProduct
        //         }
}
// hello()
// { 
// for (var i = 0; i < this.state.productIds.length-1; i++) {
//     var temp = 0;
//     componentDidMount(){return
//     axios.get(`${SERVER_HOST}/products/${this.state.productIds[i]}`)
//     .then(res => 
//     {    temp = res.data.price * this.state.quantity[i]
//         this.setState({
//             products: [...this.state.products, res.data],
//             total: this.state.total + (res.data.price * this.state.quantity[i]),
//             individualTotal: [...this.state.individualTotal, temp]
//         })
//     })
//     .catch(err => 
//     {
//         // do nothing
//     })};this.setState({loaded: true})
//     console.log(this.state.loaded);
// }

    

    render(){
        console.log(this.state.products) 
        console.log(this.state.cart)
        console.log(this.state.product)
        console.log(this.state.productIds)
        console.log(this.state.quantity)
        console.log(this.state.total)
        console.log(this.state.individualTotal)
        console.log(this.state.loaded)
        console.log(this.state.test)
        console.log(this.state.prod)

        return(
            <> 
            
            <h1>cart</h1>
            <div>
                    {this.state.products.map((item, iter) => <div>
                                {}
                                <h1>bb{item.title}</h1>
                                <h2>{item.brand}</h2>
                                <h2>{item.rating}</h2>
                                <h2>{item.price}</h2>
                                <h2>{this.state.quantity[iter]}</h2>
                                <h2>{this.state.individualTotal[iter]}</h2>{iter++}
                            </div>
                        
                    )} 
                    <h2>total</h2>
                    <p>{this.state.total}</p>
                </div>
            {/* // cart.map((item, index) => {
            //     <div>
            //         <h1>{item.title}</h1>
            //         <h2>{item.brand}</h2>
            //         <h2>{item.rating}</h2>
            //         <h2>{item.price}</h2>
            //     </div> */}
            </>
        )
        
    }
}