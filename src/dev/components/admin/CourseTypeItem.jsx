import React from 'react'

export default class CourseTypeItem extends React.Component {
  renderButtons() {

    //TODO: Add proper buttons and functionality
      return (
        <span className="item-row">
          <button className="btn-small btn-blue">Muokkaa</button>
        </span>
      )        
  }
  
  render() {
    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">
        <span className="item-row">{this.props.item.name}</span>
        
      </li>
    )
  }
}
