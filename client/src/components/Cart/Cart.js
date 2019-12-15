import React, { Component } from 'react'
import Title from '../Title'
import CartColumns from './CartColumns';
import CartList from './CartList';
import EmptyCart from './EmptyCart';
import CartTotals from "./CartTotals";
import {CourseConsumer} from '../../Context'

export default class Cart extends Component {
    render() {
        return (
            <section>
                <CourseConsumer>
                    {value => {
                        const {cart} = value;
                        if(cart.length > 0){
                        return(
                            <div>
                                <Title name="your" title="cart"></Title>
                                   <CartColumns></CartColumns>
                                   <CartList value={value} />
                                   <CartTotals value={value} history={this.props.history} />
                            </div>
                        );
                    }
                    else {
                        return <EmptyCart></EmptyCart>;

                    }
                    }}
                </CourseConsumer>
                
            </section>
        )
    }
}
