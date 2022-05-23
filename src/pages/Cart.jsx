import React from "react";
import { cartContext } from "../Context/Context";
import classes from "../styles/cart.module.css";
import { NavLink } from "react-router-dom";
export class Cart extends React.Component {
  state = {
    active: "",
  };
  componentDidUpdate() {}
  componentDidMount() {}
  render() {
    const { clear, remove, cart, addx, decx, choose, choosenCurrency } =
      this.context;

    this.componentDidMount = () => {
      let x = 1;
      let z = cart?.map((product) => Object?.values(product?.attr));
      for (let item of z) {
        item?.length === 0 && (x = 0);
      }
      if (x === 0 || cart?.length === 0) {
        document.getElementById("dis").setAttribute("disabled", "true");
      } else {
        document.getElementById("dis").removeAttribute("disabled");
      }
    };
    this.componentDidUpdate = () => {
      let x = 1;
      let z = cart?.map((product) => Object?.values(product?.attr));

      for (let item of z) {
        item?.length === 0 && (x = 0);
      }
      if (x === 0 || cart?.length === 0) {
        document.getElementById("dis").setAttribute("disabled", "true");
      } else {
        document.getElementById("dis").removeAttribute("disabled");
      }
    };
    let cartPrices = cart?.map((item) =>
      item?.product.prices?.map((price) => price?.amount)
    );

    const total = () => {
      if (cartPrices?.length > 0) {
        return choosenCurrency === "USD"
          ? cartPrices?.map((item) => item[0])?.reduce((a, b) => a + b)
          : choosenCurrency === "GBP"
          ? cartPrices?.map((item) => item[1])?.reduce((a, b) => a + b)
          : choosenCurrency === "AUD"
          ? cartPrices?.map((item) => item[2])?.reduce((a, b) => a + b)
          : choosenCurrency === "JPY"
          ? cartPrices?.map((item) => item[3])?.reduce((a, b) => a + b)
          : choosenCurrency === "RUB" &&
            cartPrices?.map((item) => item[4])?.reduce((a, b) => a + b);
      }
    };
    return (
      <>
        <div>
          <h1 style={{ marginLeft: "110px", fontWeight: "bold" }}>Cart</h1>
          <hr />
          {cart.map((product) => (
            <div>
              <div key={Math.random()} className={classes.card}>
                <div className={classes.con1}>
                  <NavLink exact to={`/product/${product?.product?.id}`}>
                    <img
                      className={classes.overimg}
                      src={product?.product?.gallery[0]}
                      alt="Girl in a jacket"
                      width="300"
                      height="300"
                    />
                  </NavLink>
                  <div className={classes.con1a}>
                    <button
                      className={classes.btnp}
                      onClick={() => addx(product)}
                    >
                      +
                    </button>
                    <div>{product?.amount}</div>
                    <button
                      className={classes.btnm}
                      onClick={() => decx(product)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div>
                  <h1 className={classes.head}>{product?.product?.id} </h1>
                  <div>
                    {product?.product?.attributes.map((attr) => {
                      return (
                        <div>
                          <div className={classes.head1}>{attr.name} :</div>
                          {attr.items.map((item) => (
                            <button
                              className={classes.btnc}
                              onClick={() =>
                                choose(product, item?.value, attr?.name)
                              }
                              style={{
                                backgroundColor:
                                  item?.value?.split("")?.includes("#") &&
                                  item?.value,

                                color:
                                  item?.value?.split("")?.includes("#") &&
                                  item?.value,
                                border:
                                  item?.value?.split("")?.includes("#") &&
                                  "none",
                              }}
                            >
                              {item?.value?.split("")?.includes("#")
                                ? item?.displayValue
                                : item?.value}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h3>You Selected :</h3>

                    {Object.values(product?.attr).map((val) => (
                      <h4
                        style={{
                          backgroundColor: val.split("")?.includes("#") && val,
                          color: val?.split("")?.includes("#") ? val : "black",
                          border: val.split("")?.includes("#")
                            ? `1px solid ${val}`
                            : "1px solid black",
                          width: "80px ",
                          textAlign: "center",
                          padding: "5px",
                          margin: "2px ",
                        }}
                      >
                        {val}{" "}
                      </h4>
                    ))}
                    {Object.values(product?.attr).length === 0 && (
                      <div>
                        You have Select One from all the Avilable Attributes
                      </div>
                    )}
                    <button
                      className={classes.rem}
                      onClick={() => remove(product)}
                    >
                      Remove Product{" "}
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}{" "}
        </div>
        <div className={classes.head1}>
          {" "}
          Tax 21% : {isNaN(total() * 0.21) && 0} {choosenCurrency}
        </div>
        <div className={classes.head1}>
          {" "}
          Total : {total()} {choosenCurrency}
        </div>

        <NavLink className={classes.btm3} to="/cart">
          <button className={classes.btno} id="dis">
            Order{" "}
          </button>
        </NavLink>
      </>
    );
  }
}
Cart.contextType = cartContext;
