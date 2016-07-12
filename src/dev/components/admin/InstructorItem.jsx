import React from 'react'

export default class InstructorItem extends React.Component {
  renderButtons() {

    //TODO: Add proper buttons and functionality
    if (true) {
      return <button className="btn-small btn-green float-right">Jotain</button>
    }
    else {
      return <button className="btn-small btn-red float-right">Jotain</button>
    }
  }
  
  render() {
    const {item} = this.props

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{item.firstname} {item.lastname} {item.email}</span>
        {this.renderButtons()}
      </li>
    )
  }
}
