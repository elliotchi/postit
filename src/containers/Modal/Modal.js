// import React, {Component} from 'react';
import { Modal } from 'components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as modalActionCreeators from 'redux/modules/modal';

const mapStateToProps = ({modal: {postText, isOpen, isSubmitDisabled}, users}) => (
  {
    user: users[users.authedID] ? users[users.authedID].info : {},
    postText,
    isOpen,
    isSubmitDisabled: postText.length <= 0 || postText.length > 140
  }
);

const mapDispatchToProps = dispatch => (
  bindActionCreators(modalActionCreeators, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
