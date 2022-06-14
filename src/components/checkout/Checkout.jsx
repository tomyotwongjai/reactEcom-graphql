import React, { Component } from 'react'
import {connect} from 'react-redux';
import {cart} from '../../assets'
import './Checkout.css'

 class Checkout extends Component {
  render() {
    return (
      <div className="checkout-container">
        <img className="cart" src={cart} alt="cart" />
      </div>
    )
  }
}

export default Checkout
