import React from 'react'

import { getTimeStrMs } from '../../helpers/timeHelper.js'

export default class CourseItem extends React.Component {
  renderContent() {
    const {item} = this.props
    var dayTxt = "";
    switch (item.day) {
      case 1:
        dayTxt = "Maanantai"
        break;
      case 2:
        dayTxt = "Tiistai"
        break;
      case 3:
        dayTxt = "Keskiviikko"
        break;
      case 4:
        dayTxt = "Torstai"
        break;
      case 5:
        dayTxt = "Perjantai"
        break;
      case 6:
        dayTxt = "Lauantai"
        break;
      case 7:
        dayTxt = "Sunnuntai"
        break;
    
      default:
        dayTxt = "EI PVM"
        if (item.date) {
          dayTxt = item.date
        }
        break;
    }
    

    return (
      <div>
        {this.renderSpecial()}
        <span className="item-row">{item.courseType.name}</span>
        <span className="item-row">{dayTxt}</span>
        <span className="item-row">klo {getTimeStrMs(item.start)} - {getTimeStrMs(item.end)}</span>
      </div>
    )
  }

  renderSpecial() {
    if (this.props.item.special) {
      return <span className="item-row">Erikoiskurssi</span>
    }
    else {
      return <span className="item-row">Vakiokurssi</span>
    }
  }

  renderButtons() {

    //TODO: Add proper buttons and functionality
    return (
      <div>
        <span className="item-row">
          <button className="btn-small btn-red">Poista</button>
        </span> 
      </div>      
    )
    
  }
  
  render() {
    

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">        
        {this.renderContent()}
      </li>
    )
  }
}
