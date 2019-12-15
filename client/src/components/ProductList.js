import React, { Component } from 'react'
import Product from './Product';
import Title from './Title';
import {storeProducts} from '../data'
import {CourseConsumer} from '../Context';

export default class ProductList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products: storeProducts
        }
    }
    

    render() {
        return (
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="product"/>
                    <div className="row">
                        <CourseConsumer>
                            {hello => {
                                return hello.products.map( product => {
                                    return <Product key={product.id} product={product}/>;
                                })
                            }}
                        </CourseConsumer>
                    </div>
                </div>
            </div>
        )
    }
}
