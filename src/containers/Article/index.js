import React, { useState, useEffect } from 'react'
import { Row, Col, Avatar, Icon, Card, Skeleton, Comment, message } from 'antd'
import BraftEditor from 'braft-editor'
import moment from 'moment'

import { Editor, CommentList } from '@components'

import Less from './index.module.less'

const Article = (props) => {
  const { store = {}, handlers = {}, query, querys = {}, id, static: { api }, mutate, mutations } = props
  const { loadStatus, session = {}, articles = {}, documentTitle } = store
  const { info = {} } = session
  const { username: currentUsername, token } = info
  const article = articles[id] || {}
  const { user: { username } = {} } = article

  const [content, setContent] = useState()
  const [submitting, setSubmitting] = useState()
  const [comment, setComment] = useState()

  useEffect(() => {
    if (username !== currentUsername) {
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

  if (loadStatus === 2) {
    return (
      <Skeleton active />
    )
  }

  const comments = article.comments.map(item => ({
    avatar: api.dev.static + item.user.avatar,
    author: item.user.nickname,
    content: item.content,
    datetime: moment(item.create_time, 'x').fromNow()
  }))

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
        <p><Icon type="star" /> {article.collections && article.collections.length}</p>
        <p><Icon type="like" /> {article.likes && article.likes.length}</p>
      </Row>
      <Card
        title="评论"
      >
        <Comment
          avatar={(
            <Avatar
              src={article.user && article.user.avatar ? api.dev.static + article.user.avatar : ''}
              alt={article.user && article.user.nickname ? article.user.nickname : ''}
              onClick={() => handleAvatarClick(article.user ? article.user.username : false)}
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
        {article.comments.length > 0 && <CommentList comments={comments} />}
      </Card>
    </section>
  )
}

export default Article
