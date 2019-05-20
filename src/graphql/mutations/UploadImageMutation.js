import gql from 'graphql-tag'

const UploadImageMutation = gql`
  mutation ($image: Upload!) {
    uploadSingleImage(image: $image) {
      url
      isSuccess
      extension {
        operator
        errors{
          path
          message
        }
      }
    }
  }
`

export default UploadImageMutation
