import React from 'react'

export default class UserItem extends React.Component {
  
  renderButtons() {

    //TODO: fix according !user.locked
    //TODO: add button functionality
    if (true) {
      return <button className="btn-small btn-red float-right">Poista käytöstä</button>
    }
    else {
      return <button className="btn-small btn-green float-right">Jotain</button>
    }
  }
  
  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{item.title}</span>
        {this.renderButtons()}
      </li>
    )
  }
}
