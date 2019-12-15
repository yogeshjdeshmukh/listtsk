import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'
import axios from "axios";
import jwt_decode from 'jwt-decode'



const CourseContext = React.createContext();



class CourseProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products:[],
             cart:[],
             detailProduct: detailProduct,
             modalOpen:false,
             modalProduct:detailProduct,
             cartSubTotal: 0,
             cartTax: 0,
             cartTotal: 0
        }
    }



    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id)
        return product;
    }

    checkout = () => {
        let token = jwt_decode(localStorage.usertoken);
        let id = token.id
        axios
            .post('/addtocart/'+id, {
                cart: this.state.cart,
                total: this.state.cartTotal
            })
            .then(response => {
                console.log('Course Added: ')
                console.log(response)
                
                if (response.status === 200) {
                    this.clearCart();
                }
            }).catch(error => {
                console.log('Errror: ')
                console.log(error);
                
            })
    }

    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(
            ()=>{
                return {detailProduct: product}
            }
        )
    }

    addtoCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
    
        this.setState(() => {
          return {
            products: [...tempProducts],
            cart: [...this.state.cart, product],
            detailProduct: { ...product }
          };
        }, this.addTotals);
      };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(() => {
            return {modalProduct:product, modalOpen:true}
        })
    }

    closeModal = () =>{
        this.setState(() => {
            return{modalOpen: false}
        })
    }

    componentDidMount(){
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });

        this.setState(() => {
            return {products: tempProducts};
        });
    };

    getTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        return {
          subTotal,
          tax,
          total
        };
      };
      addTotals = () => {
        const totals = this.getTotals();
        this.setState(
          () => {
            return {
              cartSubTotal: totals.subTotal,
              cartTax: totals.tax,
              cartTotal: totals.total
            };
          }
        );
      };
      removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
    
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
    
        tempCart = tempCart.filter(item => {
          return item.id !== id;
        });
    
        this.setState(() => {
          return {
            cart: [...tempCart],
            products: [...tempProducts]
          };
        }, this.addTotals);
      };

      clearCart = () => {
        this.setState(
          () => {
            return { cart: [] };
          },
          () => {
            this.setProducts();
            this.addTotals();
          }
        );
      };
    
    render() {
        return (
            <CourseContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addtoCart:this.addtoCart,
                openModal: this.openModal,
                closeModal:this.closeModal,
                removeItem:this.removeItem,
                clearCart: this.clearCart,
                checkout:this.checkout
            }}>
                {this.props.children}
            </CourseContext.Provider>
        )
    }
}


const CourseConsumer = CourseContext.Consumer;

export {CourseProvider, CourseConsumer};
