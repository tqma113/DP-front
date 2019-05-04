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
    ChangeUserInfoMutation: 'ChangeUserInfoMutation',
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation',
    UserConcernMutation: 'UserConcernMutation'
  },
  Article: {
    SendCommentMutation: 'SendCommentMutation',
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation'
  },
  CommentList: {

  },
  ArticleRow: {
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation'
  },
  ArticleCard: {
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation'
  },
  Index: {
    categoryStarMutation: 'categoryStarMutation',
    industryStarMutation: 'industryStarMutation',
    UserConcernMutation: 'UserConcernMutation',
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
  },
  ArticleRow: {
    QueryUsers: 'QueryUsers'
  },
  ArticleCard: {
    QueryUsers: 'QueryUsers'
  },
  Index: {
    QueryUsers: 'QueryUsers',
    QueryArticles: 'QueryArticles'
  }
}
