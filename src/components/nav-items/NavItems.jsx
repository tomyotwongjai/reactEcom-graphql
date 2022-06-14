import React, { Component } from 'react'
import { getCategories } from '../../data/gql-query'
import client from '../../data/api'
import { connect } from 'react-redux'
import {sendCategory, sendProducts} from '../../redux/types'
import './NavItems.css'
import { Link } from 'react-router-dom'
import {logo} from '../../assets'


class Navigation extends Component {
  constructor() {
    super();
    this.fetchQuery = this.fetchQuery.bind(this);
    this.getNavs = this.getNavs.bind(this);
    this.state = {
      category: "",
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchQuery();
    }
  }

  getNavs(e) {
    const {sendCategory} = this.props;
    this.setState({category: e.target.textContent});
    sendCategory(e.target.textContent);
    this.fetchQuery();
  }


   async fetchQuery() {
     const result = await client.query({
       query: getCategories,
     });

     this.setState({
       categories: [...result.data.categories],
     });
   }

  render() {
    return (
        <>
        <div className="nav-container">
        <ul className="nav-items">
          {this.state.categories && this.state.categories.map((category, id) => (
            <li key={id} onClick={this.getNavs}>
              <Link className="nav-item" to={`/category/${category.name}`} activestyle={{
                color: "#5ECE7B",
                borderBottom: "2px solid #5ECE7B",
              }}>{category.name}</Link>
            </li>
          ))}
        </ul>
        <img className="logo" src={logo} />
      </div>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCategory: (state) => dispatch(sendCategory(state)),
  sendProducts: (state) => dispatch(sendProducts(state)),
});

export default connect(null, mapDispatchToProps)(Navigation);
