
import basicAuth from 'express-basic-auth'
import { Webhook } from '../models/webhook'

const {
  RINGCENTRAL_ADMIN_USERNAME,
  RINGCENTRAL_ADMIN_PASSWORD
} = process.env

const auth = basicAuth({
  users: {
    [RINGCENTRAL_ADMIN_USERNAME]: RINGCENTRAL_ADMIN_PASSWORD
  }
})

// create database tables if not exists
const initDb = async (req, res) => {
  await Webhook.sync()
  res.send('ok')
}

const viewPolls = async (req, res) => {
  const users = await Webhook.findAll()
  let result = ''
  for (const user of users) {
    result += `<pre>\n${JSON.stringify(user, null, 2)}\n</pre>\n`
  }
  res.send(result)
}

export default (app) => {
  app.put('/admin/setup-database', auth, initDb)
  app.get('/admin/view-polls', auth, viewPolls)
}
