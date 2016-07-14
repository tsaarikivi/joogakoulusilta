import React from 'react'

export default class CourseTypeItem extends React.Component {
  renderButtons() {

    //TODO: Add proper buttons and functionality
      return <button className="btn-small btn-blue float-right">Muokkaa</button>
  }
  
  render() {
    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="float-left">{this.props.item.name}</span>
        {this.renderButtons()}
      </li>
    )
  }
}
