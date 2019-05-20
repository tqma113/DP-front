import gql from 'graphql-tag'

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

export default ChangeUserInfoMutation
