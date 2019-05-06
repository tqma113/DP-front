import React from 'react'
import { List, Comment, Tooltip, Icon, Avatar, message } from 'antd'

import map from '@map'

const CommentList = ({ comments, currentUserId, articleId, ...props }) => {
  const { mutate, mutations = {}, static: { api }, query, querys, handlers = {} } = props

  const renderItem = ({ content, likes, user, id }) => {
    const isLiked = likes.some(item => item.user_id === currentUserId)

    const handlelikeClick = () => {
      articleLike()
    }

    const handleAvatarClick = () => {
      handlers.go('' + user.username)
    }

    const articleLike = async () => {
      let data = await mutate(
        mutations.CommentLikeMutation,
        {
          commentId: Number(id),
          status: isLiked
        }
      )
      const { commentLike: { isSuccess } = {} } = data
      if (isSuccess) {
        loadArticle(articleId, 'no-cache')
      } else {
        message.error('点赞失败,请重试')
      }
    }

    const loadArticle = async (id, fetchPolicy) => {
      const data = await query(
        querys.QueryArticles,
        {
          idList: [id]
        },
        {
          fetchPolicy
        }
      )
      let { articles: { isSuccess, articles, extension = {} } = {} } = data

      if (isSuccess) {
        handlers.setArticles({ articles })
      } else {
        const { errors = [] } = extension
        const { message: messStr = '' } = errors[0]
        message.error(`数据下载失败: ${messStr}`)
      }
    }

    const actions = [
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={isLiked ? 'filled' : 'outlined'}
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
