import React, { Component } from 'react'
import {CourseConsumer} from '../Context';
import {Link} from 'react-router-dom';

export default class extends Component {
    render() {
        return (
            <div>
                <CourseConsumer>
                    {value => {
                        const {id, company, img, info, price, title, inCart} = value.detailProduct;
                        return(
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                        <h1>{title}</h1>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                        <img src={img} className="img-fluid" alt="product"/>
                                    </div>
                                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                        <h2>Course: {title}</h2>
                                        <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                            Created by : <span className="text-uppercase">
                                                {company}
                                            </span>
                                        </h4>
                                        <h4 className="text-blue">
                                            <strong>
                                            price : <span>Rs.
                                            </span>{price}
                                            </strong>
                                        </h4>
                                        <p className="text-capitaize font-weight-bold mt-3 mb-0">
                                            Info about Course
                                        </p>
                                        <p className="text-muted lead">{info}</p>
                                        <div>
                                            <Link to='/'>
                                                <button>
                                                    Back to Courses
                                                </button>
                                            </Link>
                                            <button
                                                disabled={inCart?true:false}
                                                onClick={()=>{
                                                    value.addtoCart(id)
                                                    value.openModal(id)
                                                }}
                                                >
                                                {inCart?"inCart":"add to cart"}
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                
                            </div>
                        )
                    }}
                </CourseConsumer>
            </div>
        )
    }
}
