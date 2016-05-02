import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Feed } from 'components';
import * as feedActionCreators from 'redux/modules/feed';

class FeedContainer extends Component {
  static propTypes = {
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
    const { newPostsAvailable, error, isFetching, resetNewPostsAvailable } = this.props;
    return (
      <Feed 
        newPostsAvailable={newPostsAvailable}
        error={error}
        isFetching={isFetching}
        resetNewPostsAvailable={resetNewPostsAvailable}
      />
    );
  }
}

const mapStateToProps = ({feed}) => {
  const { newPostsAvailable, error, isFetching } = feed;
  return {
    newPostsAvailable,
    error,
    isFetching
  }  
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(feedActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
