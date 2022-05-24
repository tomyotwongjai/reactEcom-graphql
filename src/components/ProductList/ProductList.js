import React, { Component } from 'react'
import './ProductList.css'
import { graphql } from 'react-apollo'
import {getProducts} from '../../data/gql-query'

 class ProductList extends Component {
     fetchProducts() {
         const data = this.props.data
            if(data.loading) {
                return <div>Loading...</div>
            }else {
                return data.categories.map(category => {
                    return (
                        <>
                            <h2 className="product-list__title">{category.name}</h2>
                            
                            <div className="product-list" key={category.name}>
                            
                                    {category.products.map(product => {
                                        return (
                                            <div className="product-list__item" key={product.id}>
                                                <img className="product-list__image" src={product.gallery[0]} alt={product.name} />
                                                <div className="product-list__info">
                                                    <h3 className="product-list__name">{product.name}</h3>
                                                    <p className="product-list__price">{product.prices[0].currency.symbol}{product.prices[0].amount}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                        </>       
                    )
                })
            }
     }
  render() {
 
    return (
      <div className="product__container">
            {this.fetchProducts()}
      </div>
    )
  }
}

export default graphql(getProducts)(ProductList);
