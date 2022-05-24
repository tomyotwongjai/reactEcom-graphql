import React, { Component } from 'react'
import Navbar from '../components/Navbar/Navbar'
import ProductList from '../components/ProductList/ProductList'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="header">
          <Navbar/>
          <ProductList />
      </div>
    )
  }
}
