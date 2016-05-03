import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Replies } from 'components';
import * as repliesActionCreators from 'redux/modules/replies';
import { staleReplies } from 'helpers/utils';

class RepliesContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    postID: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired
  }

  static defaultProps = {
    lastUpdated: 0,
    replies: {}
  }

  componentDidMount() {
    const { fetchAndHandleReplies, postID, lastUpdated } = this.props;

    if (staleReplies(lastUpdated)) {
      fetchAndHandleReplies(postID);      
    }
  }

  render() {
    const { isFetching, error, lastUpdated, replies } = this.props;
    return (
      <Replies 
        isFetching={isFetching}
        error={error}
        lastUpdated={lastUpdated}
        replies={replies}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const postRepliesInfo = state.replies[props.postID] || {};
  const { lastUpdated, replies } = postRepliesInfo;
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  }
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(repliesActionCreators, dispatch)
  )(RepliesContainer);
