import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import Header from "./Header"
import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"
import ProductCard from "./ProductCard"
import Logout from "./Logout"


export default class OrderHistory extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            orders: [],
            isLoaded: false
        }
    }

    componentDidMount()
    {
        axios.get(`${SERVER_HOST}/slaes/${localStorage.id}`)
        .then(res =>
        {
            this.setState({orders: res.data, isLoaded: true})
        })
        .catch(err =>
        {
            // do nothing
        })
    }

    table =<>

    <div className="row">
                                <div className="col-md-12">
                                    <h1>Order History</h1>
                                    <hr />
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Order ID</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orders.map(order =>
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>{order.date}</td>
                                                    <td>${order.total}</td>
                                                    <td>{order.status}</td>
                                                    <td><Link to={`/order/${order._id}`}>Details</Link></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </>
    render()
    {
        if(!localStorage.token)
        {
            return <Redirect to="/login" />
        }
        else
        {
            if(this.state.isLoaded)
            {
                return (
                    <div>
                        <Header />
                        <div className="container">
                            
                        </div>
                    </div>
                )
            }
            else
            {
                return (
                    <div>
                        <Header />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>Order History</h1>
                                    <hr />
                                    <p>Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

}
