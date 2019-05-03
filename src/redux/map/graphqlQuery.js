export const mutations = {
  UploadImage: {
    UploadImageMutation: 'UploadImageMutation'
  },
  Auth: {
    checkUsernameValidMutation: 'checkUsernameValidMutation',
    checkArticleValidMutation: 'checkArticleValidMutation'
  },
  Login: {
    LoginMutation: 'LoginMutation',
    LoginWithEmailMutation: 'LoginWithEmailMutation',
    SendEmailLoginCodeMutation: 'SendEmailLoginCodeMutation',
  },
  Register: {
    RegisterMutation: 'RegisterMutation',
    SendEmailCodeMutation: 'SendEmailCodeMutation',
    AckEmailCodeMutation: 'AckEmailCodeMutation',
    CheckUsernameMutation: 'CheckUsernameMutation'
  },
  PasswordSetting: {
    SendEmailLoginCodeMutation: 'SendEmailLoginCodeMutation',
    AckEmailCodeMutation: 'AckEmailCodeMutation',
    SetPassowordMutation: 'SetPassowordMutation'
  },
  ArticleCreate: {
    CreateArticleMutation: 'CreateArticleMutation'
  },
  PersonalCenter: {
    SendEmailLoginCodeMutation: 'SendEmailLoginCodeMutation',
    AckEmailCodeMutation: 'AckEmailCodeMutation',
  },
  Article: {
    SendCommentMutation: 'SendCommentMutation',
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation'
  }
}

export const querys = {
  PersonalCenter: {
    QueryUsers: 'QueryUsers'
  },
  Article: {
    QueryArticles: 'QueryArticles'
  }
}
