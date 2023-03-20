import React, {Component} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"

import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"


export default class BuyCar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {redirectToPayPalMessage:false,
                      payPalMessageType:null,
                      payPalOrderID:null}
    }
    
    
    
    createOrder = (data, actions) => 
    {
        return actions.order.create({purchase_units:[{amount:{value:this.props.price}}]})
    }
    
    
    onApprove = paymentData =>
    {   var formData = new FormData();
        for (var i = 0; i < this.props.product.length; i++) {
            formData.append('quantity', this.props.product[i].quantity);
            formData.append('prodcutId', this.props.product[i].productId);
          }
        //funtction to send form data to serverdoe
        
        console.log(formData);
        axios.post(`${SERVER_HOST}/sales/${paymentData.orderID}/${this.props.price}/${localStorage.id}`,formData, {headers:{ "Content-type": "multipart/form-data"}})
        .then(res => 
        {                   
            this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS, 
                           payPalOrderID:paymentData.orderID, 
                           redirectToPayPalMessage:true}) 
            for (var i = 0; i < this.props.product.length; i++) {
                axios.put(`${SERVER_HOST}/products/reduce/${this.props.product[i].productId}/${this.props.product[i].quantity}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
                axios.put(`${SERVER_HOST}/sales/${this.props.product[i].productId}/${this.props.product[i].quantity}/${this.state.payPalOrderID}`, {headers:{"authorization":localStorage.token, "Content-type": "multipart/form-data"}})
            }
            
        })
        .catch(errorData =>
        {           
            this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
                           redirectToPayPalMessage:true}) 
        })
    
    }
 
        
    onError = errorData => 
    {
        this.setState({payPalMessageType:PayPalMessage.messageType.ERROR, 
                       redirectToPayPalMessage:true})         
    }
    
    
    onCancel = cancelData => 
    {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        this.setState({payPalMessageType:PayPalMessage.messageType.CANCEL, 
                       redirectToPayPalMessage:true})       
    }
    

                
    render()
    {console.log(this.props.product);
        return (
            <div>
                {this.state.redirectToPayPalMessage ? <Redirect to= {`/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalOrderID}`}/> : null}            
            
                <PayPalScriptProvider options={{currency:"EUR", "client-id":SANDBOX_CLIENT_ID }}>
                    <PayPalButtons style={{layout: "horizontal"}} createOrder={this.createOrder} onApprove={this.onApprove} onError={this.onError} onCancel={this.onCancel}/>
                </PayPalScriptProvider>
            </div>
    )}
}
