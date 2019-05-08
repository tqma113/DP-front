const staticMap ={
  development: 'http://localhost:4000/assets/',
  production:  '/assets/'
}
const env = process.env.NODE_ENV || 'production'

export default {
  api: {
    static: staticMap[env]
  }
}
