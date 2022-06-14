import React, { Component } from 'react'
import {connect} from 'react-redux'
import client from '../../data/api'
import { sendProducts } from '../../actions/action'
import { getItemsByCategory, getAllProducts } from '../../data/gql-query'

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
    // const {currentCurrency} = this.props;

    return (
      <div>
         <h1>{this.props.category.toUpperCase()}</h1> 
          <div className="product-container">
            {this.state.products && this.state.products.map((product, id) => (
              <div key={id} className="product-item">
                <div className="product-image">
                  <img src={product.gallery[0]} alt={product.title} />
                </div>
              </div>
            ))}
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.cart.proucts,
  // currentCurrency: state.currentCurrency,
  category: state.cart.category,
})

const mapDispatchToProps = (dispatch) => ({
  sendProducts: (state) => dispatch(sendProducts(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

