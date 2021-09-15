/**
 * auto init database after server running
 */

const axios = require('axios')
const port = process.env.RINGCENTRAL_PORT
const url = `http://localhost:${port}/admin/setup-database`

export default () => {
  console.log('-> init database...')
  console.log('->', url)
  axios.put(
    url,
    undefined,
    {
      auth: {
        username: process.env.RINGCENTRAL_ADMIN_USERNAME,
        password: process.env.RINGCENTRAL_ADMIN_PASSWORD
      }
    }
  )
}
