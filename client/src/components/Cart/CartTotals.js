import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from 'jwt-decode'

export default class CartTotals extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    



  render() {
    const {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart,
      checkout
    } = this.props.value;
    const { history } = this.props;
    const emptyCart = cart.length === 0 ? true : false;


    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                <h5>
                  <span className="text-title"> subtotal :</span>{" "}
                  <strong>$ {cartSubTotal} </strong>
                </h5>
                <h5>
                  <span className="text-title"> tax :</span>{" "}
                  <strong>$ {cartTax} </strong>
                </h5>
                <h5>
                  <span className="text-title"> total :</span>{" "}
                  <strong>$ {cartTotal} </strong>
                </h5>
                <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      checkout(); clearCart();
                    }}
                  >
                    Check Out
                  </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}