import React, { Component } from 'react'
import styled from 'styled-components';
import {CourseConsumer} from '../Context';
import {Link} from 'react-router-dom'

export default class  extends Component {
    render() {
        return (
            <CourseConsumer>
                {(value) => {
                    const {modalOpen, closeModal} = value;
                    const {img, title, price} = value.modalProduct;

                    if(!modalOpen){
                        return null;
                    }
                    else{
                        return(
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4
                                    text-center text-capitalize p-5">
                                        <h5>Item added to Cart</h5>
                                        <img src={img} className="img-fluid" alt="product"/>
                                        <h5>{title}</h5>
                                        <h5 className="text-muted">price : Rs. {price}</h5>
                                        <Link to="/courses">
                                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" onClick={() => closeModal()}>
                                                Continue Shopping
                                            </button>
                                        </Link>
                                        <Link to="/cart">
                                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" onClick={() => closeModal()}>
                                                Go to Cart
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </ModalContainer>
                        )
                    }

                }}
            </CourseConsumer>
        )
    }


}

const ModalContainer = styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0, 0, 0, 0.3);
display:flex;
align-items:center;
justify-content:center;
#modal{
    background:#ffffff;
}
`;
