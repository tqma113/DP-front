import React, { useState, useEffect } from 'react'
import { Input, Row, Button, Select, message } from 'antd'
import BraftEditor from 'braft-editor'

import Less from './index.module.less'
import 'braft-editor/dist/index.css'
import './index.less'

const { TextArea } = Input
const Option = Select.Option

const ArticleCreate = (props) => {
  const { store = {}, handlers = {}, mutate, mutations = {} } = props
  const { loadStatus, categorys = [], session = {} } = store
  const { info = {} } = session
  const { username, token } = info

  const [title, setTitle] = useState()
  const [abstract, setAbstract] = useState()
  const [content, setContent] = useState()
  const [categoryIds, setCategoryIds] = useState([])
  const [sending, setSending] = useState()

  useEffect(() => {
    handlers.onload({ loadStatus })
  }, [])

  const handleSendClick = async () => {
    setSending(true)
    handlers.reload()

    let contentStr = content.toRAW()
    let categoryIdsN = categoryIds.map(i => parseInt(i))

    const data = await mutate(
      mutations.CreateArticleMutation,
      {
        title,
        abstract,
        content: contentStr,
        categoryIds: categoryIdsN,
        username,
        token
      }
    )

    const { createArticle = {} } = data

    setCreate(createArticle)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleAbstractChange = (e) => {
    setAbstract(e.target.value)
  }

  const handleContentChange = (editorState) => {
    setContent(editorState)
  }

  const handleCategorysChange = (categoryIds) => {
    setCategoryIds(categoryIds)
  }

  const setCreate = (createArticle) => {
    const { isSuccess, article, extension } = createArticle
    if (isSuccess) {
      handlers.go('/article/' + article.id)
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`上传失败: ${messStr}`)
      handlers.onload({ loadStatus })
      setSending(false)
    }
  }

  return (
    <section className={Less['create']}>
      <Input
        className={Less['title']}
        placeholder="标题"
        onChange={handleTitleChange}
        value={title}
        disabled={sending}
      />
      <TextArea
        className={Less['abstract']}
        placeholder="概述"
        onChange={handleAbstractChange}
        value={abstract}
        disabled={sending}
      />
      <BraftEditor
        className={Less['content']}
        placeholder="请输入正文"
        onChange={handleContentChange}
        value={content}
        disabled={sending}
      />
      <Row>
        <Select
          value={categoryIds}
          mode="tags"
          className={Less['categorys'] + ' category'}
          placeholder="请选择类别"
          onChange={handleCategorysChange}
          disabled={sending}
        >
          {categorys && categorys.map && categorys.map(item => (
            <Option key={item.id} value={item.id}>{item.subject}</Option>
          ))}
        </Select>
      </Row>
      <Row type="flex" justify="end">
        <Button
          type="primary"
          className={Less['send']}
          onClick={handleSendClick}
          disabled={!title || !abstract || !content || categoryIds.length === 0 || sending}
        >发布</Button>
      </Row>
    </section>
  )
}

export default ArticleCreate
