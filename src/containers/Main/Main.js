import React, { Component, PropTypes } from 'react'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux';

class MainContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired
  }
  
  render () {
    const { isAuthed } = this.props;
    return (
      <div className={container}>
        <Navigation isAuthed={isAuthed} />
        <div className={innerContainer}>
        {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(
  ({users: {isAuthed}}) => ({isAuthed})
)(MainContainer);
