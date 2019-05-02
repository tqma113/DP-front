export const mutations = {
  UploadImage: {
    UploadImageMutation: 'UploadImageMutation'
  },
  Auth: {
    checkUsernameValidMutation: 'checkUsernameValidMutation'
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
  }
}

export const querys = {
  PersonalCenter: {
    QueryUsers: 'QueryUsers'
  }
}
