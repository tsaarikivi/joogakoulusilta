import React from 'react'

export default class UserItem extends React.Component {


  render() {
   const { item } = this.props
    return (
      <li>
      <p>{item.name}</p>
      <p>{item.email}</p>
      </li>
    );
  }
}

