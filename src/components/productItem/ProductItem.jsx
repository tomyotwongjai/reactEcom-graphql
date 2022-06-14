import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import getSymbolFromCurrency from 'currency-symbol-map';
import './ProductItem.css'
import { loadCurrentItem, addToCart } from '../../redux/types';


class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state= {hover: false};
        this.mouseOn = this.mouseOn.bind(this);
        this.mouseOff = this.mouseOff.bind(this);
    }

    mouseOn( ){
        this.setState({hover: true});
    }

    mouseOff(){
        this.setState({hover: false});
    }

    addToCart(item) {
        const { add } = this.props;
        const { attributes } = item;
        if (attributes.length > 0) {
          const format = attributes.map((attr) => {
            const { items, type, id, name } = attr;
            const item = items.find((attr) => ({ item: attr }));
            return (attr = { item, type, id, name });
          });
          const newItem = Object.assign({}, { item }, { savedAttribute: format });
          add(newItem);
        } else {
          const newItem = Object.assign({}, { item: item });
          add(newItem);
        }
      }
    
  render() {
    const { item } = this.props;
    const { prices, amount, id, sendItem } = this.props;

    return (
      <div 
        className="item-container"
        onMouseOver={this.mouseOn}
        onMouseLeave={this.mouseOff}
        key={item.id}
      >
        <div className="item-list">
            <Link to={`/product/${id}`}>
                <button className="product-button"
                  onClick={() => sendItem(item)}
                 >
                    <div className="image-container">
                        <img className="image" src={item.gallery[0]} alt={item.name}  />
                    </div>
                </button>
                {!item.inStock && (
                <div className="av-info">
                  <span className="av-text">out of stock</span>
                </div>
              )}
            </Link>

            {this.state.hover && item.inStock && (
              <button onClick={() => this.addToCart(item)} />
            )}
        </div>
            <div className="product-info">
              <span>{item.brand} {item.name}</span> 
              <div className="prices">{item.prices[0].currency.symbol}{item.prices[0].amount}</div>
            </div>
           
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    sendItem: (item) => dispatch(loadCurrentItem(item)),
    add: (item) => dispatch(addToCart(item)),
  });

  export default connect(null, mapDispatchToProps)(ProductItem);
