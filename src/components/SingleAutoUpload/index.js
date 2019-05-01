import React, { useState } from 'react'
import { Upload, Button, Icon, message } from 'antd'
import { connect } from '@map'

import getBase64 from '@utils/getBase64'

import Less from './index.module.less'
import './index.less'

const SingleUplaod = (props) => {
  const { className = '', style = {}, uploadStyle = {}, buttonStyle = {}, onLoad, mutate, mutations = {}, static: { api } } = props

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [image, setImage] = useState()
  const [imageUrl, setImageUrl] = useState('')
  const [imageBase64, setImageBase64] = useState('')

  const beforeUpload = (file) => {
    setLoading(true)
    setImage()
    setImageBase64('')
    setImageUrl('')
    setUploadSuccess(false)

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      setLoading(false)
    } else {
      setImage(file)
      try {
        getBase64(file).then(base64 => {
          setImageBase64(base64)
          setLoading(false)
        })
      } catch (err) {
        setLoading(false)
      }
    }

    return false
  }

  const handleUploadChange = ({ fileList }) => {

  }

  const handleUploadClick = async () => {
    if (loading || uploading) {
      return
    }

    setUploading(true);
    const data = await mutate(
      mutations.UploadImageMutation,
      {
        image
      }
    )
    const { uploadSingleImage = {} } = data
    const { isSuccess = false, url, extension = {} } = uploadSingleImage
    if (isSuccess) {
      setImageUrl(url)
      setUploadSuccess(true)
      if (onLoad) onLoad(image, url, imageBase64)
      message.success('上传成功!')
    } else {
      const { errors = [] } = extension
      const { message: messStr } = errors[0]
      message.error(`上传失败: ${messStr}`)
    }
    setUploading(false)
  }

  return (
    <div className={`${Less['single-upload']} single-upload ${className}`} style={style}>
      <Upload
        style={uploadStyle}
        accept="image/*"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader "
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleUploadChange}
      >
        {imageUrl ?
          <img className={Less['image']} src={api.dev.static + imageUrl} alt="avatar" /> :
          imageBase64 ?
          <img className={Less['image']} src={imageBase64} alt="avatar" /> :
          <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">选择图片</div>
          </div>
        }
      </Upload>
    </div>
  )
}

export default connect(SingleUplaod, 'UploadImage')
