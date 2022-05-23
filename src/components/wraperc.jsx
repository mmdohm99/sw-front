import React, { Component } from "react";
export class OutsideAlerterc extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutsidec = this.handleClickOutsidec.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsidec);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutsidec);
  }

  handleClickOutsidec(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.func();
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
