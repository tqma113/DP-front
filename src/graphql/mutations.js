import gql from 'graphql-tag'

const LoginMutation = gql`
  mutation ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      token
      username
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

const LoginWithEmailMutation = gql`
  mutation ($email: String!, $code: String!, $key: String!) {
    loginWithEmail (email: $email, code: $code, key: $key) {
      token
      username
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

const RegisterMutation = gql`
  mutation ($username: String!,
            $nickname: String!,
            $location: String!,
            $birthday: Date!
            $email: String!,
            $gender: String!
            $statement: String!
            $u_key: String!,
            $e_key: String!
            $avatar: String!) {
    register (username: $username,
              nickname: $nickname,
              location: $location,
              birthday: $birthday,
              gender: $gender
              email: $email,
              statement: $statement,
              u_key: $u_key,
              e_key: $e_key,
              avatar: $avatar) {
      isSuccess
      token
      username
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

const SendEmailCodeMutation = gql`
  mutation ($email: String!) {
    sendEmailCode(email: $email) {
      key
      isSuccess
      extension{
        operator
        errors{
          path
          message
        }
      }
    }
  }
`

const SendEmailLoginCodeMutation = gql`
  mutation ($email: String!) {
    sendEmailLoginCode(email: $email) {
      key
      isSuccess
      extension{
        operator
        errors{
          path
          message
        }
      }
    }
  }
`

const AckEmailCodeMutation = gql`
  mutation ($email: String!, $code: String!, $key: String!) {
    ackEmail(email: $email, code: $code, key: $key) {
      key
      isSuccess
      extension{
        operator
        errors{
          path
          message
        }
      }
    }
  }
`

const CheckUsernameMutation = gql`
  mutation ($username: String!) {
    checkUsername(username: $username) {
      key
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const SetPassowordMutation = gql`
  mutation ($email: String!, $password: String!, $key: String!){
    setPassword(email: $email, password: $password, key: $key) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const checkUsernameValidMutation = gql`
  mutation ($username: String!) {
    checkUsernameValid(username: $username) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const CreateArticleMutation = gql`
  mutation ($title: String!, $abstract: String!, $content: String!, $username: String!, $token: String!, $categoryIds: [Int]!) {
    createArticle(title: $title, abstract: $abstract, content: $content, username: $username, token: $token categoryIds: $categoryIds) {
      article {
        id
        title
        abstract
        content
        release_at
        last_modify_at
        user {
          id
        }
        project_link
        categorys {
          id
        }
        industrys {
          id
        }
        comments {
          id
        }
        likes
        collections
      }
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const checkArticleValidMutation = gql`
  mutation($id: Int!) {
    checkArticleIdValid(id: $id) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const SendCommentMutation = gql`
  mutation($username: String!, $token: String!, $content: String!, $articleId: Int!) {
    sendComment(username: $username, token: $token, content: $content, articleId: $articleId) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const ArticleStarMutation = gql`
  mutation($username: String!, $token: String!, $articleId: Int!, $status: Boolean!) {
    articleStar(username: $username, token: $token, articleId: $articleId, status: $status) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const ArticleLikeMutation = gql`
  mutation($username: String!, $token: String!, $articleId: Int!, $status: Boolean!) {
    articleLike(username: $username, token: $token, articleId: $articleId, status: $status) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const UserConcernMutation = gql`
  mutation($username: String!, $token: String!, $userId: Int!, $status: Boolean!) {
    userConcern(username: $username, token: $token, userId: $userId, status: $status) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

const ChangeUserInfoMutation = gql`
  mutation(
    $email: String!,
    $key: String!,
    $nickname: String
    $location: String
    $gender: String
    $birthday: Date
    $avatar: String
    $statement: String
    $eduBG: JSON
    $emRecords: JSON
    $secQuestions: JSON
    $categoryIds: [Int]!
    $industryIds: [Int]!
  ) {
    changeUserInfo(
      email: $email,
      key: $key,
      nickname: $nickname,
      location: $location
      gender: $gender
      birthday: $birthday
      avatar: $avatar
      statement: $statement
      eduBG: $eduBG
      emRecords: $emRecords
      secQuestions: $secQuestions
      categoryIds: $categoryIds
      industryIds: $industryIds
    ) {
      isSuccess
      extension {
        operator
        errors {
          path
          message
        }
      }
    }
  }
`

export const names = {
  LoginMutation: 'login',
  RegisterMutation: 'register',
  UploadImageMutation: 'uploadSingleImage',
  SendEmailCodeMutation: 'sendEmailCode',
  AckEmailCodeMutation: 'ackEmail',
  CheckUsernameMutation: 'checkUsername',
  SendEmailLoginCodeMutation: 'sendEmailLoginCode',
  LoginWithEmailMutation: 'loginWithEmail',
  SetPassowordMutation: 'setPassword',
  checkUsernameValidMutation: 'checUsernameValid',
  CreateArticleMutation: 'createArticle',
  checkArticleValidMutation: 'checkArticleValidMutation',
  SendCommentMutation: 'SendCommentMutation',
  ArticleStarMutation: 'ArticleStarMutation',
  ArticleLikeMutation: 'ArticleLikeMutation',
  ChangeUserInfoMutation: 'ChangeUserInfoMutation',
  UserConcernMutation: 'UserConcernMutation'
}

export {
  LoginMutation,
  RegisterMutation,
  UploadImageMutation,
  SendEmailCodeMutation,
  AckEmailCodeMutation,
  CheckUsernameMutation,
  SendEmailLoginCodeMutation,
  LoginWithEmailMutation,
  SetPassowordMutation,
  checkUsernameValidMutation,
  CreateArticleMutation,
  checkArticleValidMutation,
  SendCommentMutation,
  ArticleStarMutation,
  ArticleLikeMutation,
  ChangeUserInfoMutation,
  UserConcernMutation
}
