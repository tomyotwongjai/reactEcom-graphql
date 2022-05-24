import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import {logo, cart} from '../../assets'
import { getCategories } from '../../data/gql-query'
import './Navbar.css'

class Navbar extends Component {
    fetchcategories() {
        const data = this.props.data
        if(data.loading) {
            return <div>Loading...</div>
        } else {
           return data.categories.map(category => {
               return (
                <li className="navbar__item" key={category.name}>
                    <NavLink className="nav__link" to={`/${category.name}`}>{category.name}</NavLink>
                </li>
               )
           })
        }
    }
    render() {
        return (
        <>
        <div className="navbar__container">
            <ul className="navbar__list">
                {this.fetchcategories()}             
            </ul>
            <button className="navbar__logo">
                <img className="logo" src={logo} alt="logo" />
            </button>
        </div>
        </>
        )
    }
}

export default graphql(getCategories)(Navbar);
