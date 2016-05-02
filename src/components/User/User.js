import React, { PropTypes } from 'react';
import { userContainer, header } from './styles.css';
import { errorMsg } from 'sharedStyles/styles.css';
import { PostContainer } from 'containers';

const User = ({noUser, name, isFetching, error, postIds}) => (
  <div>
    {noUser ? <p className={header}>{'This user does not exist'}</p>
    : <div>
      {isFetching
        ? <p className={header}>{'Loading'}</p>
        : <div>
            <div className={userContainer}>
              <div>{name}</div>
            </div>
            {postIds.map(id => (
              <PostContainer postID={id} key={id} />
            ))}
            {!postIds.length 
              ? <p className={header}>
                  {`${name.split(' ')[0]} doesn't have any posts yet`}
                </p>
              : null
            }
            {error ? <p className={errorMsg}>{error}</p> : null}
          </div>
      }
    </div>
  }
  </div>
)

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  postIds: PropTypes.array.isRequired
}

export default User;
