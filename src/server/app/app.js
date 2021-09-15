
import viewIndex from './routes/view-index'
import api from './routes/api'
import { resolve } from 'path'
import staticRoute from './routes/static'
import admin from './routes/admin'
import act from './routes/rc-action'

export default function extend (app) {
  const {
    APP_HOME = '/'
  } = process.env
  staticRoute(app)
  app.set('views', resolve(__dirname, '../views'))
  app.set('view engine', 'pug')
  app.get(APP_HOME, viewIndex('app'))
  api(app)
  admin(app)
  act(app)
}
