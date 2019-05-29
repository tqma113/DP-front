import React, { useState, useEffect } from 'react'
import { Input, Row, Button, Select, message, Skeleton } from 'antd'
import BraftEditor from 'braft-editor'

import { SingleLargeUpload } from '@components'

import Less from './index.module.less'
import 'braft-editor/dist/index.css'
import './index.less'

const { TextArea } = Input
const Option = Select.Option

const ArticleEdit = (props) => {
  const { store = {}, handlers = {}, query, querys = {}, id, mutate, mutations } = props
  const { loadStatus, articles = {}, documentTitle, categorys = [], industrys = [] } = store
  const article = articles[id] || {}


  const [title, setTitle] = useState()
  const [abstract, setAbstract] = useState()
  const [content, setContent] = useState()
  const [categoryIds, setCategoryIds] = useState([])
  const [industryIds, setIndustryIds] = useState([])
  const [sending, setSending] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!articles[id]) {
      loadArticle(id)
    } else {
      if (loadStatus !== 3) {
        document.title = article.title + documentTitle
        handlers.onload({ loadStatus })

        loadContent()
      }
    }
  })

  const loadContent = () => {
    const editorState = BraftEditor.createEditorState(article.content)
    setContent(editorState)
    setTitle(article.title)
    setAbstract(article.abstract)
    setCategoryIds(article.categorys.map(i => i+''))
    setIndustryIds(article.industrys.map(i => i+''))
    setImageUrl(article.image)
  }

  const loadArticle = async (id, fetchPolicy) => {
    const data = await query(
      querys.QueryArticles,
      {
        idList: [Number(id)]
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


  const handleSendClick = async () => {
    setSending(true)
    handlers.reload()

    let contentStr = content.toRAW()
    let categoryIdsN = categoryIds.map(i => parseInt(i))
    let industryIdsN = industryIds.map(i => parseInt(i))

    const data = await mutate(
      mutations.EditArticleMutation,
      {
        title,
        abstract,
        content: contentStr,
        categoryIds: categoryIdsN,
        industryIds: industryIdsN,
        image: imageUrl,
        id: Number(id)
      }
    )

    const { editArticle = {} } = data

    setEdit(editArticle)
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

  const handleIndustrysChange = (industryIds) => {
    setIndustryIds(industryIds)
  }

  const handleUpload = (image, url, imageBase64) => {
    setImageUrl(url)
  }

  const setEdit = (editArticle) => {
    const { isSuccess, article, extension = {} } = editArticle
    if (isSuccess) {
      loadArticle(article.id, 'no-cache')
      handlers.go('/article/' + article.id)
    } else {
      const { errors = [{}] } = extension
      const { message: messStr = '' } = errors[0]
      message.error(`上传失败: ${messStr}`)
      handlers.onload({ loadStatus })
      setSending(false)
    }
  }

  if (loadStatus === 2) {
    return (
      <Skeleton active />
    )
  }
  return (
    <section className={Less['edit'] + " edit"}>
      <SingleLargeUpload onLoad={handleUpload} img={imageUrl} style={{ width: '100%' }} uploadStyle={{ width: '100%', display: 'block' }} />
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
        contentStyle={{ minHeight: '500px', height: 'auto' }}
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
      <Row>
        <Select
          value={industryIds}
          mode="tags"
          className={Less['categorys'] + ' category'}
          placeholder="请选择行业"
          onChange={handleIndustrysChange}
          disabled={sending}
        >
          {industrys && industrys.map && industrys.map(item => (
            <Option key={item.id} value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </Row>
      <Row type="flex" justify="end">
        <Button
          type="primary"
          className={Less['send']}
          onClick={handleSendClick}
          disabled={!title || !abstract || !content || sending} //|| categoryIds.length === 0
        >发布</Button>
      </Row>
    </section>
  )
}

export default ArticleEdit
