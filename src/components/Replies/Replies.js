import React, { PropTypes } from 'react';
import {
  avatar, replyContainer, header,
  cushion, center, author
} from './styles.css';
import { formatTimestamp } from 'helpers/utils';
import { errorMsg } from 'sharedStyles/styles.css';

const Replies = ({isFetching, error, replies}) => {
  const replyIds = Object.keys(replies);

  return (
    <div>
      { error ? <h3 className={errorMsg}>{error}</h3> : null }
      { isFetching 
        ? <p className={subHeader}>{'Fetching Replies'}</p>
        : <div>
            <h1 className={header}>{'Replies'}</h1>
            {replyIds.map(replyID => 
              <Reply key={replyID} comment={replies[replyID]} />
            )}
          </div>
      }
    </div>
  );
};

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object.isRequired
}

export default Replies;
