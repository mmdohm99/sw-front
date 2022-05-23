import React from "react";
import { gql } from "@apollo/client";
import { client } from "../App";
import { cartContext } from "../Context/Context";
// import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classes from "../styles/home.module.css";
export class Electronics extends React.Component {
  state = {};

  componentDidMount() {
    const GET_ELECTRONICS = gql`
      query {
        categories {
          products {
            id
            name
            inStock
            gallery
            category
            brand
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      }
    `;
    client.query({ query: GET_ELECTRONICS }).then((res) => {
      const products = res.data.categories[2].products;
      console.log(res.data.categories);
      this.setState({ products });
    });
  }

  render() {
    const { add, choosenCurrency } = this.context;

    return (
      <>
        <div className={classes.container}>
          {" "}
          {this?.state?.products?.map((product) => (
            <div key={Math.random()} className={classes.card}>
              <div className={product?.inStock ? classes.no : classes.over}>
                OUT OF STOCK
              </div>
              <NavLink exact to={`/product/${product.id}`}>
                <img
                  className={classes.image}
                  src={product.gallery[0]}
                  alt="Girl in a jacket"
                  width="300"
                  height="300"
                />
              </NavLink>
              <div>
                <h5 style={{ position: "relative", bottom: "-15px" }}>
                  {product.id}{" "}
                </h5>
                {choosenCurrency === "USD" ? (
                  <h5 className={classes.text}>
                    {product.prices[0].currency.symbol +
                      product.prices[0].amount}{" "}
                  </h5>
                ) : choosenCurrency === "GBP" ? (
                  <span className={classes.text}>
                    {product.prices[1].currency.symbol +
                      product.prices[1].amount}{" "}
                  </span>
                ) : choosenCurrency === "AUD" ? (
                  <span className={classes.text}>
                    {product.prices[2].currency.symbol +
                      product.prices[2].amount}{" "}
                  </span>
                ) : choosenCurrency === "JPY" ? (
                  <span className={classes.text}>
                    {product.prices[3].currency.symbol +
                      product.prices[3].amount}{" "}
                  </span>
                ) : (
                  choosenCurrency === "RUB" && (
                    <span className={classes.text}>
                      {product.prices[4].currency.symbol +
                        product.prices[4].amount}{" "}
                    </span>
                  )
                )}
              </div>

              <button
                className={product?.inStock ? classes.cbtn : classes.non}
                disabled={!product?.inStock}
                onClick={() => add(product)}
              >
                {" "}
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.4736 4.8484C23.0186 4.29247 22.3109 3.95457 21.5785 3.95457H6.19066L5.71097 2.16691C5.43262 1.12772 4.47323 0.402832 3.36082 0.402832H0.783719C0.354361 0.402832 0 0.740725 0 1.15227C0 1.56284 0.353351 1.9017 0.783719 1.9017H3.36082C3.73985 1.9017 4.06854 2.14333 4.1692 2.50577L7.25167 14.2494C7.53003 15.2886 8.48941 16.0135 9.60182 16.0135H19.6833C20.7947 16.0135 21.7808 15.2886 22.0335 14.2494L23.9286 6.80699C24.1053 6.1293 23.9543 5.40442 23.4736 4.84848L23.4736 4.8484ZM22.3879 6.46712L20.4927 13.9095C20.3921 14.272 20.0634 14.5136 19.6844 14.5136H9.60185C9.22282 14.5136 8.89413 14.272 8.79347 13.9095L6.59533 5.47717H21.5796C21.8323 5.47717 22.085 5.59798 22.237 5.79148C22.388 5.98403 22.463 6.22566 22.388 6.46729L22.3879 6.46712Z"
                    fill="white"
                  />
                  <path
                    d="M10.1332 16.9778C8.69316 16.9778 7.50586 18.1132 7.50586 19.4902C7.50586 20.8672 8.69326 22.0027 10.1332 22.0027C11.5733 22.0036 12.7606 20.8682 12.7606 19.491C12.7606 18.1137 11.5732 16.9775 10.1332 16.9775V16.9778ZM10.1332 20.4814C9.55188 20.4814 9.09685 20.0463 9.09685 19.4903C9.09685 18.9344 9.55188 18.4993 10.1332 18.4993C10.7146 18.4993 11.1696 18.9344 11.1696 19.4903C11.1687 20.0227 10.689 20.4814 10.1332 20.4814Z"
                    fill="white"
                  />
                  <path
                    d="M18.8251 16.978C17.3851 16.978 16.1978 18.1135 16.1978 19.4905C16.1978 20.8675 17.3852 22.0029 18.8251 22.0029C20.2651 22.0029 21.4525 20.8675 21.4525 19.4905C21.4279 18.1143 20.2651 16.978 18.8251 16.978ZM18.8251 20.4816C18.2438 20.4816 17.7887 20.0465 17.7887 19.4906C17.7887 18.9346 18.2438 18.4995 18.8251 18.4995C19.4065 18.4995 19.8615 18.9346 19.8615 19.4906C19.8615 20.0229 19.3809 20.4816 18.8251 20.4816Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          ))}{" "}
        </div>
      </>
    );
  }
}
Electronics.contextType = cartContext;
