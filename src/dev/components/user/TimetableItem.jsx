import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class TimeTableItem extends React.Component {

  slotClicked(){
    var that = this;
    console.log("CLICK", this.props);
    axios.post(
      'http://localhost:3000/reserveSlot', {
        user: this.props.currentUser.key,
        slot: this.props.item
      })
      .then( response => {
        console.log(response);
      })
      .catch( error => {
        console.log(error);
      });
  }

  render() {
    return (
      <td>
        <h3>KORJAA TITLE</h3>
        <button className="btn-small" onClick={this.slotClicked.bind(this)}>Varaa</button>
        <p>{this.props.item.start} - {this.props.item.end}</p>
      </td>
    );
  }
}


function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(TimeTableItem)
