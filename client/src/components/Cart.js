import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import axios from "axios"
import BuyProdcut from "./BuyProduct"
import LinkInClass from "../components/LinkInClass"

import { SERVER_HOST } from "../config/global_constants"
import ProdcutCard from "./ProductCard"
import Header from "./Header"
// import cart from "../../../server/models/cart"

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            products: [],
            product: [],
            productIds: [],
            quantity: [],
            total: 0,   
            individualTotal: [],
            loaded: false,
            test: "",
            prod: {}
        }
    }

    componentDidMount() {

        axios.get(`${SERVER_HOST}/cart/${localStorage.id}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                this.setState({
                    cart: res.data
                })
                
                let product = this.state.cart.product
                this.setState({ product: product })
                this.state.product.map((item) => {
                    this.setState((prevState) => ({
                        quantity: prevState.quantity.concat(item.quantity),
                        productIds: prevState.productIds.concat(item.productId)
                    }))
                    // formData.append("item", item.productId
                })
            // var formData = new JSON();
                // formData.append(plsWork())
                // this.state.productIds.map((item) => {formData.append(item, item)})
                // formData.append("1", this.state.productIds[1])
                // formData.append("2", this.state.productIds[2])
                //  var prodObject = new Object.assign({}, this.state.productIds)
                // this.state.productIds.map((item) => { formData.append(`productId[${item}]`, item) })
                // this.state.productIds.map(item => {
                //     formData.append("productId[" + item + "]", item);
                //   });
                  const formData = JSON.stringify(this.state.product);
                // formData.append("productId", prodObject)
                var temp1 = 0;
                // console.log(formData) 
                this.setState({ prod: formData })
                // axios.get(`${SERVER_HOST}/products/multi/id`, formData)
                //     .then(res => {
                //         this.setState({
                //             products: res.data,
                //             test: "hello"
                //         })
                //     })
                //     .catch(() => {
                //         // do nothing
                //     })
                for (var i = 0; i < this.state.productIds.length; i++) {
                    var temp = 0;
                    axios.get(`${SERVER_HOST}/products/${this.state.productIds[i]}`)
                        .then(res => {
                            let temp = parseFloat(res.data.price) * parseFloat(this.state.quantity[i])
                            this.setState({
                                products: [...this.state.products, res.data],
                                
                            })
                        })
                        .catch(err => {
                            // do nothing
                        })
                }
                
                temp1 = formData.length
                console.log(temp1)
                this.hello()
                this.setState({ loaded: true });
            })
            .catch(err => {
                // do nothing
            })

        function plsWork() {
            var formData = new FormData();

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

    delete = (e) => {
        
        axios.delete(`${SERVER_HOST}/cart/delete/${localStorage.id}/${e}`, { headers: { "authorization": localStorage.token } })
            .then(res => {
                this.setState({
                    cart: res.data
                })
            })
            .catch(err => {
                // do nothing
            })
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



    render() {
        var total = 0;
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

        let flag = <div>loading cart is empty</div>
        if(this.state.cart!=null)
        {flag = <><h1>cart</h1>
        <div>
            {this.state.products.map((item, iter) => <div>
                { }
                <h1>{item.title}</h1>
                <h2>{item.brand}</h2>
                <h2>{item.price}</h2>
                <h2>{this.state.quantity[iter]}</h2>
                <h2>{item.price *this.state.quantity[iter]}</h2>
                <button value={item._id} onClick={() => this.delete()}>delete</button>
                {total += item.price * this.state.quantity[iter]}
             </div>

            )}
            <h2>total</h2>
            <h2>{total}</h2>
        </div>
         
             <BuyProdcut product={this.state.product} price={total} />
             </>
        }


        return (
            <>
            <Header/>
                {flag}

                
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