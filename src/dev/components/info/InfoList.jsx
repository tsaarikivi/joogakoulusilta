import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Item from './InfoItem.jsx'
import { fetchInfoList } from '../../actions/info.js'

class InfoList extends React.Component {

  componentWillMount() {
    this.props.fetchInfoList()
  }
  
  renderList(item) {
    return (
      <Item key={item.key} item={item}/>
    )
  }
  
  render() {
    return (
      <div class="container bordered-container">
        <div className="content-container">
          <ul className="wide-list">
            {this.props.list.list.map(this.renderList)}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { list: state.infoList }
}

export default connect(mapStateToProps, { fetchInfoList })(InfoList)