import React, { Component } from 'react'
import {NavBar, ProductList} from '../components'
import { connect } from 'react-redux'
import {store} from '../redux/store'
import './Home.css'

class Home extends Component {


  render() {
    
    return (
      <div className="home-container">
          <NavBar  />
          <ProductList  />
      </div>
    )
  }
}


export default Home
