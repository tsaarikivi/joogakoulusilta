import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BarChart from './BarChart.js';

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
    this.width = document.defaultView.innerWidth;
  }


  onResize(){
    console.log("RESIZE");
    this.width = document.defaultView.innerWidth;
    this.forceUpdate();
  }

  componentDidMount(){
    document.onresize = this.onResize()    
  }

  onChangeStartDate(date){
    this.startDate = date;
    if(this.endDate < this.startDate){
      this.onChangeEndDate(this.startDate)
    }
    this.startDate.hours(0);
    this.startDate.minutes(0);
    this.startDate.seconds(0);
    this.startDate.milliseconds(0);
    this.forceUpdate();
  }

  onChangeEndDate(date){
    this.endDate = date;
    if(this.endDate < this.startDate){
      this.onChangeStartDate(this.endDate)
    }
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
    //console.log("DV-next:", nextProps);
  }

  showSessions(){
    if(this.endDate - this.startDate < 20*24*60*60*1000){
      return this.showHourlySessions()
    }
    return this.showDailySessions()
  }

  showHourlySessions(){
    const { dataReady, data } = this.props.ddata;
    if(!dataReady){
      return(<div></div>)
    }
    console.log("WIDTH:", this.width);
    let barWidth = Math.round(this.width/((this.endDate - this.startDate)/3600000));
    barWidth = (barWidth === 0)? 1 : barWidth; 
    let xRange = [this.startDate.format().slice(0,16), this.endDate.format().slice(0,16)]
    let hourlyData = Array.concat(data.sessions.hourlySessions)
    return(
      <div>
          <BarChart
          axisLabels={{x: 'Aika', y: 'Käyttökerrat'}}
          margin={{top: 10, right: 30, bottom: 60, left: 80}}
          axes
          grid
          height={250}
          width={this.width}
          datePattern="%Y-%m-%dT%H:%M"
          barWidth={barWidth}
          xType={'time'}
          xDomainRange={xRange}
          xTickNumber = {4}
          yTickNumber = {6}
          data={hourlyData}
          />
      </div>
    )
  }


  showDailySessions(){
      const { dataReady, data } = this.props.ddata;
      if(!dataReady){
        return(<div></div>)
      }
      let barWidth = Math.round(this.width/((this.endDate - this.startDate)/(24*3600000)));
      barWidth = (barWidth === 0)? 1 : barWidth; 
      let xRange = [this.startDate.format().slice(0,10), this.endDate.format().slice(0,10)]
      let dailyData = Array.concat(data.sessions.dailySessions)
      return(
        <div>
            <BarChart
            axisLabels={{x: 'Aika', y: 'Käyttökerrat'}}
            axes
            grid
            height={250}
            width={this.width}
            datePattern="%Y-%m-%d"
            barWidth={barWidth}
            xType={'time'}
            xDomainRange={xRange}
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
            <DatePicker className="date-start" 
              selected={this.startDate} 
              startDate={this.startDate} 
              endDate={this.endDate} 
              onChange={this.onChangeStartDate.bind(this)} />
          </div>
          <div className="float-left">
            <p>Loppu:</p>
            <DatePicker className="date-end" 
            selected={this.endDate} 
            startDate={this.startDate} 
            endDate={this.endDate} 
            onChange={this.onChangeEndDate.bind(this)} />
          </div>
          <div className="float-left">
            <button className="btn-small btn-green btn-right" onClick={() => {this.fetchData()}}>Hae tiedot</button>
          </div>
          {this.showSessions()}
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
