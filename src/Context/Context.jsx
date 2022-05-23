import React from "react";

export const cartContext = React.createContext();

export class Context extends React.Component {
  state = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    CURRENCY: "USD",
  };

  render() {
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    let cart = this.state.cart;
    let choose = (product, newVal, ValKey) => {
      this?.setState({
        cart: [
          ...cart?.map((item) =>
            item?.id === product?.id
              ? {
                  ...product,
                  attr: {
                    ...product.attr,
                    [ValKey]: newVal,
                  },
                }
              : item
          ),
        ],
      });
    };
    let addx = (product) => {
      this?.setState({
        cart: [
          ...cart?.map((item) =>
            item?.id === product?.id
              ? {
                  ...product,
                  amount: product?.amount + 1,
                }
              : item
          ),
        ],
      });
    };

    let decx = (product) => {
      if (product.amount === 1) {
        remove(product);
      } else {
        this?.setState({
          cart: [
            ...cart?.map((item) =>
              item?.id === product?.id
                ? {
                    ...product,
                    amount: product?.amount - 1,
                  }
                : item
            ),
          ],
        });
      }
    };
    // console.log(cart);

    const add = (product, attr = [], amount = 1) => {
      let id = Math.random() * 1000;
      this.setState({
        cart: [...this.state.cart, { product, attr, amount, id }],
      });
    };
    // console.log(cart);
    const clear = () => {
      this.setState({ cart: [] });
    };

    const remove = (product) => {
      this.setState({
        cart: this?.state?.cart.filter((item) => item?.id !== product?.id),
      });
    };

    const setCurrency = (currency) => {
      this.setState({ CURRENCY: currency });
    };
    let choosenCurrency = this.state.CURRENCY;
    return (
      <cartContext.Provider
        value={{
          add,
          clear,
          cart,
          remove,
          setCurrency,
          choosenCurrency,
          addx,
          decx,
          choose,
        }}
      >
        {this.props.children}
      </cartContext.Provider>
    );
  }
}
