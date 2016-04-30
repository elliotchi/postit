import React, {Component, PropTypes} from 'react';
import { Logout } from 'components';
import { logoutAndUnauth } from 'redux/modules/users';
import { connect } from 'react-redux';

class LogoutContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    
    dispatch(logoutAndUnauth());  
  }
  
  render() {
    return (
      <Logout />
    );
  }
}

export default connect()(LogoutContainer);
