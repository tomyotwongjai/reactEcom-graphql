import React, { Component } from 'react'
import { getCurrencies } from '../../data/gql-query'
import client from '../../data/api'
import { connect } from 'react-redux'
import { sendCurrency } from '../../redux/types'
import { ReactComponent as Up } from '../../assets/arrow-up.svg'
import { ReactComponent as Down } from '../../assets/arrow-down.svg'
import './Currency.css'

class Currency extends Component {
  constructor () {
    super();
    this.state = { currencies: [], showModal: false, };
    this.fetchCurrency = this.fetchCurrency.bind(this);
  }

  closeModal = () => {
    this.setState({showModal: false})
    document.removeEventListener('click', this.closeModal);
  }

  componentDidMount() {
    this.fetchCurrency();
    document.addEventListener('click', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeModal);
  }

  handleClick = (e) => {
    if (this.state.showModal) {
      this.closeModal();
      return;
    }
    this.setState({showModal: true})
    e.stopPropagation();
    document.addEventListener('click', this.closeModal);
  }

  async fetchCurrency() {
    const result = await client.query({
      query: getCurrencies,
    });
    document.addEventListener("click", this.closeModal);
    this.setState({ currencies: result.data.currencies });
  }

  handleChange = (e) => {
    const { sendCurrency } = this.props;
    const currency = e.target.innerText;
    sendCurrency(currency);

    this.setState({
      label: currency,
      open: false,
    });

   console.log(currency)
  }

  render(){

    return(
      <div className="currency-container" onClick={this.handleClick}>
      <span>
          {this.state.label}
        {this.state.showModal ? <Up /> : <Down />}
      </span>
      <div id="options">
        {this.state.showModal &&
          this.state.currencies.map((item, id) => (
            <span key={id}
              data={item.value}
              title={item.label}
              onClick={this.handleChange}
              >
              {item.symbol + item.label}
            </span>
          ))}
      </div>
    </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  sendCurrency: (state) => dispatch(sendCurrency(state)),
});

const mapStateToProps = (state) => ({
  selected: state.cart.currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
