import React from 'react'

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
        break;
    }

    return (
      <div>
        <span className="item-item float-left">{item.courseType.name}</span>
        <span className="item-item float-left">{dayTxt}</span>
        <span className="item-item float-left">klo {item.start/36000} - {item.end/36000}</span>
      </div>
    )
  }

  renderButtons() {

    //TODO: Add proper buttons and functionality
    return (
      <div>
        <button className="btn-small btn-red float-right">Poista</button>
        <button className="btn-small btn-blue float-right">Muokkaa</button>        
      </div>      
    )
    
  }
  
  render() {
    

    //TODO: Render functionality for admin

    return (
      <li className="text-list-item">        
        {this.renderContent()}
        {this.renderButtons()}
      </li>
    )
  }
}
