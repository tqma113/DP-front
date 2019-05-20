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
  Home: {
    SendEmailLoginCodeMutation: 'SendEmailLoginCodeMutation',
    AckEmailCodeMutation: 'AckEmailCodeMutation',
    ChangeUserInfoMutation: 'ChangeUserInfoMutation',
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation',
    UserConcernMutation: 'UserConcernMutation',
    categoryStarMutation: 'categoryStarMutation',
    industryStarMutation: 'industryStarMutation',
  },
  Article: {
    SendCommentMutation: 'SendCommentMutation',
    ArticleStarMutation: 'ArticleStarMutation',
    ArticleLikeMutation: 'ArticleLikeMutation'
  },
  CommentList: {
    CommentLikeMutation: 'CommentLikeMutation'
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
  },
  Message: {
    SendMessageMutation: 'SendMessageMutation'
  },
  Layout: {
    LogoutMutation: 'LogoutMutation'
  },
  Loading: {
    LogoutMutation: 'LogoutMutation'
  },
  ArticleEdit: {
    EditArticleMutation: 'EditArticleMutation'
  },
  Apply: {
    ApplyAdminMutation: 'ApplyAdminMutation',
    ApplyAddCategoryMutation: 'ApplyAddCategoryMutation',
    ApplyAddIndustryMutation: 'ApplyAddIndustryMutation',
    ChangeAdminMutation: 'ChangeAdminMutation',
    ChangeAddCategoryMutation: 'ChangeAddCategoryMutation',
    ChangeAddIndustryMutation: 'ChangeAddIndustryMutation',
    CancelApplyAdminMutation: 'CancelApplyAdminMutation',
    CancelApplyCategoryMutation: 'CancelApplyCategoryMutation',
    CancelApplyIndustryMutation: 'CancelApplyIndustryMutation'
  },
  Admin: {
    DealApplyAdminMutation: 'DealApplyAdminMutation',
    DealApplyCategoryMutation: 'DealApplyCategoryMutation',
    DealApplyIndustryMutation: 'DealApplyIndustryMutation',
    AddAdminMutation: 'AddAdminMutation',
    AddCategoryMutation: 'AddCategoryMutation',
    AddIndustryMutation: 'AddIndustryMutation'
  }
}

export const querys = {
  Home: {
    QueryUsers: 'QueryUsers',
    QueryArticles: 'QueryArticles'
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
  },
  Message: {
    QueryMessages: 'QueryMessages',
    QueryUsers: 'QueryUsers'
  },
  CommentList: {
    QueryArticles: 'QueryArticles'
  },
  ArticleEdit: {
    QueryArticles: 'QueryArticles'
  },
  Apply: {
    QueryAdminApply: 'QueryAdminApply',
    QueryCategoryApply: 'QueryCategoryApply',
    QueryIndustryApply: 'QueryIndustryApply'
  },
  Admin: {
    QueryAdminApply: 'QueryAdminApply',
    QueryCategoryApply: 'QueryCategoryApply',
    QueryIndustryApply: 'QueryIndustryApply'
  }
}
