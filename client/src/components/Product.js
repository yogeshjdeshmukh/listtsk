import React, { Component } from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {CourseConsumer} from '../Context' 

export default class Product extends Component {
    render() {
        const {id, title, img, price, inCart} = this.props.product;
        return (
            <CourseWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <CourseConsumer>
                        {(value) => (             
                    <div className="img-container p-5" 
                    onClick={() => {value.handleDetail(id)}}
                    >
                       <Link to="/details">
                           <img src={img} alt="product" className="image card-img-top"/>
                           </Link> 
                           <button className="btn btn-outline-danger text-uppercase" disabled={inCart?true:false}
                            onClick={() => {
                                value.addtoCart(id)
                                value.openModal(id)
                                }} >
                            {inCart?(<p className="text-capitalize mb-0" disabled>
                                {" "}
                                in Cart
                            </p>):(<i className="fas fa-cart-plus">Click Here</i>)}
                        </button>
                    </div>
                    )}  
                     </CourseConsumer>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="font-italic mb-0">
                            <span className="mr-1">Rs.</span>
                            {price}
                        </h5>
                    </div>
                    
                   
                     
                </div>

            </CourseWrapper>
        )
    }
}


const CourseWrapper = styled.div`
.card{
    border-color:transparent;
    transition: all 1s linear;
    box-shadow:2px 2px 5px 0px rgba(0, 0, 0, 0.2);
}
.image{
    width:100%
}

.card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
        background: rgba(247. 247, 247); 
    }
}

.img-container{
    position:relative
    overflow:hidden;
}

.img-container:hover .card-img-top{
    transform: scale(1.05)
}



`;