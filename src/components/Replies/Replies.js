import React, { PropTypes } from 'react';
import {
  avatar, replyContainer, header,
  cushion, center, author
} from './styles.css';
import { formatTimestamp } from 'helpers/utils';
import { errorMsg } from 'sharedStyles/styles.css';

const Reply = ({comment: {avatar, name, timestamp, reply}}) => (
  <div className={replyContainer}>
    <img src={avatar} alt={name} className={avatar} />
    <div>
      <div className={author}>{name}</div>
      <div className={cushion}>{formatTimestamp(timestamp)}</div>
      <div className={cushion}>{reply}</div>
    </div>
  </div>
);

Reply.propTypes = {
  comment: PropTypes.object.isRequired
}

const Replies = ({isFetching, error, replies}) => {
  const replyIds = Object.keys(replies);

  return (
    <div>
      { error ? <h3 className={errorMsg}>{error}</h3> : null }
      { isFetching 
        ? <p>{'Fetching Replies'}</p>
        : <div>
            <h1 className={header}>{'Replies'}</h1>
            {replyIds.map(replyID => 
              <Reply key={replyID} comment={replies[replyID]} />
            )}
          </div>
      }
      {replyIds.length === 0 ? <h3 className={center}>{'Be the first to reply'}</h3> : null}
    </div>
  );
};

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object.isRequired
}

export default Replies;
