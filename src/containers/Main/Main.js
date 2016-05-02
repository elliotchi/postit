import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux';
import * as usersLikesActionCreators from 'redux/modules/usersLikes';

class MainContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    setUsersLikes: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { isAuthed, setUsersLikes } = this.props;
    if (isAuthed) {
      setUsersLikes();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthed, setUsersLikes } = this.props;
    if (isAuthed !== nextProps.isAuthed) {
      setUsersLikes();
    }
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
  ({users: {isAuthed}}) => ({isAuthed}),
  dispatch => bindActionCreators(usersLikesActionCreators, dispatch)
)(MainContainer);
