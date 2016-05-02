import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Feed } from 'components';
import * as feedActionCreators from 'redux/modules/feed';

class FeedContainer extends Component {
  static propTypes = {
    postIds: PropTypes.array.isRequired,
    newPostsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewPostsAvailable: PropTypes.func.isRequired
  }
  
  componentDidMount() {
    const { setAndHandleFeedListener } = this.props;
    setAndHandleFeedListener();
  }
  
  render() {
    const { newPostsAvailable, error, isFetching, resetNewPostsAvailable, postIds } = this.props;
    return (
      <Feed 
        newPostsAvailable={newPostsAvailable}
        error={error}
        isFetching={isFetching}
        resetNewPostsAvailable={resetNewPostsAvailable}
        postIds={postIds}
      />
    );
  }
}

const mapStateToProps = ({feed}) => {
  const { newPostsAvailable, error, isFetching, postIds } = feed;
  return {
    newPostsAvailable,
    error,
    isFetching,
    postIds
  }  
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(feedActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
