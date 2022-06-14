import React, { Component } from 'react'
import {NavItems, Currency, Checkout} from '../../components'
import './NavBar.css'

 class NavBar extends Component {
  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-container">
          <NavItems />
          <Currency />
          <Checkout />
        </div>
      </div>
    )
  }
}

export default NavBar;
