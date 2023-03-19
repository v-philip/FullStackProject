import React, {Component} from "react"
import {Link} from "react-router-dom"

// import axios from "axios"

 import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

// import BuyCar from "./BuyCar"
import SeeMore from "./SeeMore"
export default class ProdcutCard extends Component 
{    
    constructor(props)
    {
        super(props)

        this.state = ({
          products : []
        })
    }
    // componentDidMount() 
    // {
    //     this.props.car.photos.map(photo => 
    //     {
    //         return axios.get(`${SERVER_HOST}/cars/photo/${photo.filename}`)
    //         .then(res => 
    //         {         
    //             document.getElementById(photo._id).src = `data:;base64,${res.data.image}`                                                         
    //         })
    //         .catch(err =>
    //         {
    //             // do nothing
    //         })
    //     })
    // }
    
    
    render() 
    {
        // let soldOrForSale = null
        // if(localStorage.accessLevel <= ACCESS_LEVEL_GUEST)
        // {
        //     if(this.props.car.sold !== true)
        //     {
        //         soldOrForSale = <BuyCar carID={this.props.car._id} price={this.props.car.price} />
        //     }
        //     else
        //     {
        //         soldOrForSale = "SOLD"
        //     }
        // }
        
        
        return (
            <>
            {this.props.products.map((product) =>
            <div className="itemContainer">
                <img id="image" src={product.thumbnail} alt="product"/>
                <ul>
                <li>{product.title}</li>
                <li>{product.brand}</li>
                <li>{product.rating}</li>
                <li>{product.price}</li>
                {/* <li className="carPhotos">
                    {this.props.car.photos.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                </li>            */}
                 <li>
                     {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditProduct/" + product._id}>Edit</Link> : null}
                    
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteProduct/" + product._id}>Delete</Link> : null}                       
                    {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <li>{product.stock}</li> : null}                  
                    {/* {soldOrForSale} */}
                 </li>   
                 <Link className ="button" to={"/SeeMore/" + product._id} >Read More</Link>

                </ul>
            </div>)}
            </>
        )
    }
}