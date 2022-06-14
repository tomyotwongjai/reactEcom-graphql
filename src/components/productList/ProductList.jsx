import React, { Component } from 'react'
import {connect} from 'react-redux'
import client from '../../data/api'
import { sendProducts } from '../../redux/types'
import { getItemsByCategory, getAllProducts } from '../../data/gql-query'
import ProductItem from '../productItem/ProductItem'
import './ProductList.css'

 class ProductList extends Component {

  constructor() {
    super();
    this.state = {hover: false, products: []};
    this.mouseOn = this.mouseOn.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.mouseOff = this.mouseOff.bind(this);
  }

  componentDidMount(){
    this.fetchProducts();
  }

  componentDidUpdate(prevProps){
    if(prevProps.category !== this.props.category){
      this.fetchProducts();
    }
  }

  mouseOn( ){
    this.state({hover: true});
  }

  async fetchAllProduts(){
    const result = await client.query({
      query: getAllProducts,
    });
    this.setState({products: result.data.category.products})
  }

  async fetchProducts(){
    const {sendProducts} = this.props;
    const result = await client.query({
      query: getItemsByCategory,
      variables: {
        title: this.props.category === "All" ? "" : this.props.category,
      },
    });
    this.setState({products: result.data.category.products});
    sendProducts(result.data.category.products);
  }

  mouseOff(){
    this.setState({hover: false});
  }

  render() {
    const {currentCurrency} = this.props;

    return (
      <>
      <h1 className="title">{this.props.category.toUpperCase()}</h1><div className="product-container">
        {this.state.products && this.state.products.map((item, id) => (
          <ProductItem
            key={item.name}
            item={item}
            id={id}
            amount={item.price} 
            />
        ))}
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.cart.proucts,
  currentCurrency: state.currency,
  category: state.cart.category,
})

const mapDispatchToProps = (dispatch) => ({
  sendProducts: (state) => dispatch(sendProducts(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

