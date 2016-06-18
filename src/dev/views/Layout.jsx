import React from "react";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        loggedIn: false,
        uid: null,
      },
      shop: {
        cart: [],
        items: [],
      },
      courses: [],
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
