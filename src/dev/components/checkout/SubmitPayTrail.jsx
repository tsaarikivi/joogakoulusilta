import React from "react";

export default class SubmitPayTrail extends React.Component {

  render() {
    return(
      <div>
        <button className="btn-small btn-blue" onClick={() => this.props.actions.buyWithPaytrail(this.props.initializedTransaction)}>Siirry maksamaan</button>
        <button className="btn-small btn-blue" onClick={() => this.props.actions.cancelPaytrailPayment(this.props.initializedTransaction)}>Peru osto</button>
      </div>
    )
  }
}
