import React from 'react'

export default class TimeTableItem extends React.Component {
  render() {
    return (
      <td>
        <h3>KORJAA TITLE</h3>
        <p>{this.props.item.start} - {this.props.item.end}</p>
      </td>
    );
  }
}
