import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {BarChart} from 'react-easy-chart';

import * as actionCreators from '../../actions/diagnostics.js'

var DatePicker = require('react-datepicker')
var moment = require('moment')


class DiagnosticsViewer extends React.Component {

  constructor(){
    super()
    this.startDate = moment();
    this.startDate.hours(0);
    this.startDate.minutes(0);
    this.startDate.seconds(0);
    this.startDate.milliseconds(0);

    this.endDate = moment();
    this.endDate.hours(23);
    this.endDate.minutes(59);
    this.endDate.seconds(59);
    this.endDate.milliseconds(999);
  }

  componentWillMount(){
    
  }

  onChangeStartDate(date){
    this.startDate = date;
    this.startDate.hours(0);
    this.startDate.minutes(0);
    this.startDate.seconds(0);
    this.startDate.milliseconds(0);
    this.forceUpdate();
  }

  onChangeEndDate(date){
    this.endDate = date;
    this.endDate.hours(23);
    this.endDate.minutes(59);
    this.endDate.seconds(59);
    this.endDate.milliseconds(999);
    this.forceUpdate();
  }

  fetchData(){
    this.props.actions.fetchDiagnostics(this.startDate.valueOf(), this.endDate.valueOf())
  }

  componentWillReceiveProps(nextProps){
    console.log("DV-next:", nextProps);
  }


  showHourlySessions(){
    console.log("SHOW HOURLY");
    const { dataReady, data } = this.props.ddata;
    if(!dataReady){
      return(<div></div>)
    }
    let hourlyData = Array.concat(data.sessions.hourlySessions)
    console.log("hourlyD: ", hourlyData);
    return(
      <div>
          <BarChart
          axisLabels={{x: 'Tunnit', y: 'Sessiot'}}
          axes
          height={250}
          width={650}
          xType={'linear'}
          data={hourlyData}
          />
      </div>
    )
  }

  showDailySessions(){
    console.log("SHOW DAILY");
      const { dataReady, data } = this.props.ddata;
      if(!dataReady){
        return(<div></div>)
      }
      let dailyData = Array.concat(data.sessions.dailySessions)
      console.log("dailyD: ", dailyData);
      return(
        <div>
            <BarChart
            axisLabels={{x: 'Päivät', y: 'Sessiot'}}
            axes
            height={250}
            width={650}
            xType={'linear'}
            data={dailyData}
            />
        </div>
      )
    }

  render() {
    return (
      <div class="container">
        <div className="content-container">
          <div className="float-left">
            <p>Alku:</p>
            <DatePicker className="date-start" selected={this.startDate} onChange={this.onChangeStartDate.bind(this)} />
          </div>
          <div className="float-left">
            <p>Loppu:</p>
            <DatePicker className="date-end" selected={this.endDate} onChange={this.onChangeEndDate.bind(this)} />
          </div>
          <div className="float-left">
            <button className="btn-small btn-green btn-right" onClick={() => {this.fetchData()}}>Hae tiedot</button>
          </div>
          {this.showHourlySessions()}
          {this.showDailySessions()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ddata: state.ddata, auth: state.auth, currentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticsViewer)
