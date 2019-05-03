import React, { useState, useEffect } from 'react'
import { Row, Col, Avatar, Icon, Card, Skeleton, Comment, message } from 'antd'
import BraftEditor from 'braft-editor'
import moment from 'moment'

import { Editor, CommentList } from '@components'

import Less from './index.module.less'

const Article = (props) => {
  const { store = {}, handlers = {}, query, querys = {}, id, static: { api }, mutate, mutations } = props
  const { loadStatus, session = {}, articles = {}, documentTitle, users = {} } = store
  const { info = {} } = session
  const { username: currentUsername, token } = info
  const article = articles[id] || {}
  const { user: { username } = {} } = article
  const currentUser = users[currentUsername]

  const isLiked = article.likes ? article.likes.some(item => item.user && item.user.username === currentUsername) : false
  const isCollected = article.collections ? article.collections.some(item => item.user && item.user.username === currentUsername) : false

  const [content, setContent] = useState()
  const [submitting, setSubmitting] = useState()
  const [comment, setComment] = useState()

  useEffect(() => {
    if (!articles[id]) {
      loadArticle(id)
    } else {
      document.title = article.title + documentTitle
      handlers.onload({ loadStatus })

      loadContent()
    }
  })

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
    let { articles: { isSuccess, articles } = {} } = data

    if (isSuccess) {
      handlers.setArticles({ articles })
      setComment('')
      setSubmitting(false)
    }
  }

  const loadContent = () => {
    const editorState = BraftEditor.createEditorState(article.content)
    const content = editorState.toHTML()
    setContent(content)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = () => {
    if (!comment) {
      message.info('请先填写评论内容')
      return
    }

    setSubmitting(true)

    sendComment()
  }

  const handleAvatarClick = (username) => {
    if (username) handlers.go('/' + username)
  }

  const sendComment = async () => {
    let data = await mutate(
      mutations.SendCommentMutation,
      {
        username,
        token,
        articleId: Number(article.id),
        content: comment
      }
    )
    const { sendComment: { isSuccess } = {} } = data
    if (isSuccess) {
      loadArticle(id, 'no-cache')
    } else {
      message.error('评论失败,请重试')
      setSubmitting(false)
    }
  }

  const handleArticleStarClick = () => {
    if (currentUsername) {
      articleStar()
    }
  }

  const handleArticleLikeClick = () => {
    if (currentUsername) {
      articleLike()
    }
  }

  const articleStar = async () => {
    let data = await mutate(
      mutations.ArticleStarMutation,
      {
        username: currentUsername,
        token,
        articleId: Number(article.id),
        status: isCollected
      }
    )
    const { articleStar: { isSuccess } = {} } = data
    if (isSuccess) {
      loadArticle(id, 'no-cache')
    } else {
      message.error('点赞失败,请重试')
    }
  }

  const articleLike = async () => {
    let data = await mutate(
      mutations.ArticleLikeMutation,
      {
        username: currentUsername,
        token,
        articleId: Number(article.id),
        status: isLiked
      }
    )
    const { articleLike: { isSuccess } = {} } = data
    if (isSuccess) {
      loadArticle(id, 'no-cache')
    } else {
      message.error('点赞失败,请重试')
    }
  }

  if (loadStatus === 2) {
    return (
      <Skeleton active />
    )
  }

  return (
    <section className={Less['article']}>
      <Row className={Less['title']}>{article.title}</Row>
      <Row className={Less['user']} type="flex" justify="start">
        <Col>
          <Avatar size={50} src={article.user && article.user.avatar ? api.dev.static + article.user.avatar : ''} />
        </Col>
        <Col offset={1}>
          <div className={Less['user']}>
            <a href={'/' + username} className={Less['nickname']}>{article.user && article.user.nickname ? article.user.nickname : ''}</a>
            <p className={Less['statement']}>{article.user && article.user.statement ? article.user.statement : ''}</p>
          </div>
        </Col>
      </Row>
      <Row className={Less['abstract']}>{article.abstract}</Row>
      <Row className={Less['content']}><div dangerouslySetInnerHTML={{ __html: content }}></div></Row>
      <Row className={Less['time']} type="flex">
        <p>创建于 {moment(article.release_time).format('YYYY-MM-DD')}</p>
      </Row>
      <Row className={Less['info']} type="flex">
        <p><Icon onClick={handleArticleStarClick} type="star" theme={isCollected ? 'twoTone' : 'outlined'} /> {article.collections && article.collections.length}</p>
        <p><Icon onClick={handleArticleLikeClick} type="like" theme={isLiked ? 'twoTone' : 'outlined'} /> {article.likes && article.likes.length}</p>
      </Row>
      <Card
        title="评论"
      >
        <Comment
          avatar={(
            <Avatar
              src={currentUser && currentUser.avatar ? api.dev.static + currentUser.avatar : ''}
              alt={currentUser && currentUser.nickname ? currentUser.nickname : ''}
              onClick={() => handleAvatarClick(currentUser ? currentUser.username : false)}
            />
          )}
          content={(
            <Editor
              onChange={handleCommentChange}
              onSubmit={handleCommentSubmit}
              submitting={submitting}
              value={comment}
            />
          )}
        />
        {article.comments.length > 0 && <CommentList currentUserId={Number(currentUser.id)} comments={article.comments} />}
      </Card>
    </section>
  )
}

export default Article
