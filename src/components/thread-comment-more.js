import React, { PropTypes } from 'react';
import ThreadComment from './thread-comment';
import { Map, List } from 'immutable';
import FetchCommentsLink from './fetch-comments-link';

const ThreadCommentMore = ({
  comment,
  linkId,
  toggleExpandChildren,
  shouldExpandChildren,
  fetchMoreComments,
  cache,
}) => {
  const childData = comment.get('data');
  const moreChildren = childData.get('children', List());
  const canDisplay = moreChildren.filter((id) => cache.has(id));
  const cantDisplay = moreChildren.filter((id) => !cache.has(id));

  return (
    <div>
      {
        canDisplay.map((id) => (
          <ThreadComment
            toggleExpandChildren={toggleExpandChildren}
            shouldExpandChildren={shouldExpandChildren}
            fetchMoreComments={fetchMoreComments}
            comment={cache.get(id)}
            cache={cache}
            key={id} />
        ))
      }
      {
        cantDisplay.size > 0
          ? <FetchCommentsLink
              childCount={cantDisplay.size}
              fetchComments={() => (
                fetchMoreComments(linkId, cantDisplay.join(','))
              )} />
          : null
      }
    </div>
  );
};

ThreadCommentMore.propTypes = {
  fetchMoreComments: PropTypes.func.isRequired,
  comment: PropTypes.instanceOf(Map).isRequired,
  cache: PropTypes.instanceOf(Map).isRequired,
  toggleExpandChildren: PropTypes.func.isRequired,
  shouldExpandChildren: PropTypes.func.isRequired,
  linkId: PropTypes.string.isRequired,
};

export default ThreadCommentMore;
