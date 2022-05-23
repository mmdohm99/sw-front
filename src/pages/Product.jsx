import React from "react";
import { gql } from "@apollo/client";
import { client } from "../App";
import { cartContext } from "../Context/Context";
import classes from "../styles/product.module.css";
export class Product extends React.Component {
  state = {
    products: { gallery: [], attributes: [], prices: [] },
    img: "",
    qty: 1,
    choosenAttributes: {},
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const GET_SINGLEPRODUCTS = gql`
        query {
          product(id: "${id}") {
            id
            name
            inStock
            gallery
            description
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
      `;
    client.query({ query: GET_SINGLEPRODUCTS }).then((res) => {
      const product = res.data.product;
      this.setState({ products: product, img: product.gallery[0] });
      // console.log(product);
    });
  }
  render() {
    const { add, choosenCurrency } = this.context;

    const bigImg = (img) => {
      this.setState({ img: img });
    };

    return (
      <div className={classes.container}>
        <div className={classes.gallary}>
          <div className={classes.Sgallary}>
            <img
              onClick={() => bigImg(this?.state?.products?.gallery[0])}
              className={classes.small}
              src={this?.state?.products?.gallery[0]}
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
            <img
              onClick={() =>
                bigImg(
                  this?.state?.products?.gallery[1] ||
                    this?.state?.products?.gallery[0]
                )
              }
              className={classes.small}
              src={
                this?.state?.products?.gallery[1] ||
                this?.state?.products?.gallery[0]
              }
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
            <img
              onClick={() =>
                bigImg(
                  this?.state?.products?.gallery[2] ||
                    this?.state?.products?.gallery[0]
                )
              }
              className={classes.small}
              src={
                this?.state?.products?.gallery[2] ||
                this?.state?.products?.gallery[0]
              }
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
            <img
              onClick={() =>
                bigImg(
                  this?.state?.products?.gallery[3] ||
                    this?.state?.products?.gallery[0]
                )
              }
              className={classes.small}
              src={
                this?.state?.products?.gallery[3] ||
                this?.state?.products?.gallery[0]
              }
              alt="Girl in a jacket"
              width="200"
              height="200"
            />
          </div>
          <img
            className={classes.big}
            src={this?.state?.img}
            alt="Girl in a jacket"
            width="200"
            height="200"
          />
        </div>
        <div className={classes.info}>
          <h1>{this?.state?.products?.brand} </h1>
          <h3>{this?.state?.products?.name}</h3>
          <div>
            {this?.state?.products?.attributes.map((attr) => {
              return (
                <div>
                  <h3>{attr.name} :</h3>
                  {attr.items.map((item) => (
                    <>
                      <button
                        className={classes.btnc}
                        onClick={() => {
                          this.setState({
                            choosenAttributes: {
                              ...this?.state?.choosenAttributes,
                              [attr?.name]: item?.value,
                            },
                          });
                        }}
                        style={{
                          backgroundColor:
                            item?.value?.split("")?.includes("#") &&
                            item?.value,
                          color:
                            item?.value?.split("")?.includes("#") &&
                            item?.value,
                          border:
                            item?.value?.split("")?.includes("#") && "none",
                        }}
                      >
                        {item?.value?.split("")?.includes("#")
                          ? item?.value
                          : item?.value}
                      </button>
                    </>
                  ))}
                </div>
              );
            })}
            <div>
              <h3>You Selected :</h3>
              {Object.values(this?.state?.choosenAttributes).map((val) => (
                <h4
                  style={{
                    backgroundColor: val.split("")?.includes("#") && val,
                    color: val?.split("")?.includes("#") && val,
                    border: val.split("")?.includes("#")
                      ? "none"
                      : "1px solid black",
                    width: "80px ",
                    textAlign: "center",
                    padding: "5px",
                    margin: "2px ",
                  }}
                >
                  {" "}
                  {val}{" "}
                </h4>
              ))}
            </div>
          </div>
          <div className={classes.text}>
            <h3>{this?.state?.products?.prices[0]?.__typename} : </h3>
            {choosenCurrency === "USD" ? (
              <h3>
                {this?.state?.products?.prices[0]?.amount +
                  " " +
                  this?.state?.products?.prices[0]?.currency?.symbol}{" "}
              </h3>
            ) : choosenCurrency === "GBP" ? (
              <h3>
                {this?.state?.products?.prices[1]?.amount +
                  " " +
                  this?.state?.products?.prices[1]?.currency?.symbol}{" "}
              </h3>
            ) : choosenCurrency === "AUD" ? (
              <h3>
                {this?.state?.products?.prices[2]?.amount +
                  " " +
                  this?.state?.products?.prices[2]?.currency?.symbol}{" "}
              </h3>
            ) : choosenCurrency === "JPY" ? (
              <h3>
                {this?.state?.products?.prices[3]?.amount +
                  " " +
                  this?.state?.products?.prices[3]?.currency?.symbol}{" "}
              </h3>
            ) : (
              choosenCurrency === "RUB" && (
                <h3>
                  {this?.state?.products?.prices[4]?.amount +
                    " " +
                    this?.state?.products?.prices[4]?.currency?.symbol}{" "}
                </h3>
              )
            )}
          </div>

          <div>
            <button
              className={classes.btna}
              onClick={() =>
                add(
                  this?.state?.products,
                  this?.state?.choosenAttributes,
                  this?.state?.qty
                )
              }
            >
              Add to Cart
            </button>
          </div>
          <h4>
            {this?.state?.products?.description?.replace(/[<p></p>]+/g, "")}
          </h4>
        </div>
      </div>
    );
  }
}
Product.contextType = cartContext;
