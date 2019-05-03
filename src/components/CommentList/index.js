import React from 'react'
import { List, Comment, Tooltip, Icon, Avatar } from 'antd'

import map from '@map'

const CommentList = ({ comments, currentUserId, static: { api }  }) => {


  const renderItem = ({ content, likes, user }) => {
    const like = likes.some(item => item.user_id === currentUserId)

    const handlelikeClick = () => {

    }

    const handleAvatarClick = () => {

    }

    const actions = [
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={like ? 'filled' : 'outlined'}
            onClick={handlelikeClick}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {likes.length}
        </span>
      </span>,
      <span>回复</span>,
    ];

    return (
      <Comment
        actions={actions}
        author={<a href={'/' + user.username}>{user.nickname}</a>}
        avatar={(
          <Avatar
            src={api.dev.static + user.avatar}
            alt={user.nickname}
            onClick={handleAvatarClick}
          />
        )}
        content={(
          <p>{content}</p>
        )}
      />
    )
  }
  return (<List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={renderItem}
  />)
}

export default map(CommentList, 'CommentList')
