import React, { useState } from 'react'
import { Upload, Button, Icon, message } from 'antd'
import { compose } from '@map'

import getBase64 from '@utils/getBase64'

import Less from './index.module.less'
import './index.less'

const SingleUplaod = (props) => {
  const { className = '', style = {}, uploadStyle = {}, buttonStyle = {}, onLoad, mutate } = props

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
    try {
      const res = await mutate({
        variables: {
          image
        }
      })
      const { data = {} } = res
      const { uploadSingleImage } = data
      const { isSuccess = false, url } = uploadSingleImage
      if (isSuccess) {
        setImageUrl(url)
        setUploadSuccess(true)
        message.success('上传成功!')
      } else {
        message.error('上传失败!')
      }
    } catch (err) {
      message.error('数据发送失败,请重试')
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
          <img className={Less['image']} src={imageUrl} alt="avatar" /> :
          imageBase64 ?
          <img className={Less['image']} src={imageBase64} alt="avatar" /> :
          <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">选择图片</div>
          </div>
        }
      </Upload>
      <Button
        type="primary"
        onClick={handleUploadClick}
        disabled={uploadSuccess || !imageBase64}
        className={Less['upload-button']}
        loading={uploading}
        style={buttonStyle}
      >
        {uploading ? '上传中' : '开始上传' }
      </Button>
    </div>
  )
}

export default compose(SingleUplaod, 'UploadImage')