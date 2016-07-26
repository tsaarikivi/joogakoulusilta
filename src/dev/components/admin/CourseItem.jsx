import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseForm from '../../components/admin/CourseForm.jsx'
import { getTimeStrMsBeginnignOfDay, toHplusMfromMs } from '../../helpers/timeHelper.js'
import * as actionCreators from '../../actions/admin.js'


class CourseItem extends React.Component {

  constructor(){
    super()
    this.toggleForm = false
    this.initialValues = {};
  }

 componentWillReceiveProps(nextProps){
      if(nextProps.cmp.expanded && nextProps.cmp.expander === this.props.item.key){
        this.toggleForm = true;
      } else {
        this.toggleForm = false;
      }
      this.initialValues = Object.assign({},nextProps.item) 
      this.initialValues.start = toHplusMfromMs(nextProps.item.start)
      this.initialValues.end = toHplusMfromMs(nextProps.item.end)
      this.initialValues.courseType = nextProps.item.courseType.name
      this.initialValues.place = nextProps.item.place.name
      this.initialValues.instructor = nextProps.item.instructor.key
  }
  

  remove(item){
    this.props.actions.removeCourse(item.key);
  }

  toggleModify(item){
    if(this.toggleForm){
      this.props.actions.minimizeCourseForm()
    } else {
      this.props.actions.expandCourseForm(item.key)
    }    
  }

  renderForm(item){
    if(this.toggleForm){
      return(<CourseForm mode="modify" itemkey={item.key} initialValues={this.initialValues}/>)
    } else {
      return(<div></div>)
    }    
  }


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
        <span className="item-row">{item.courseType.name}</span>
        <span className="item-row">{dayTxt}</span>
        <span className="item-row">klo {getTimeStrMsBeginnignOfDay(item.start)} - {getTimeStrMsBeginnignOfDay(item.end)}</span>
      </div>
    )
  }
  
  render() {
    var buttonText = (this.toggleForm)? "Peru Muokkaus" : "Muokkaa"
    const {item} = this.props;
    return (
      <li className="text-list-item">        
        {this.renderContent()}
        <button className="expand-btn" onClick={() => {this.toggleModify(item)}}>{buttonText}</button>
        <button className="expand-btn" onClick={() => {this.remove(item)}}>Poista</button>
        {this.renderForm(item)}
      </li>
    )
  }
}

function mapStateToProps(state) {
  return { cmp: state.courseForm }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseItem)