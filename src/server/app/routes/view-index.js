/**
 * view index
 */

import copy from 'json-deep-copy'
import { pack } from '../common/constants'

const {
  RINGCENTRAL_APP_SERVER,
  CDN,
  APP_HOME
} = process.env

export default (view) => {
  return (req, res) => {
    // const list = 'https://*.hubspot.com;'
    // if (view === 'index') {
    //   res.set(
    //     'Content-Security-Policy',
    //     `frame-ancestors ${list}`
    //   )
    // }
    res.set({
      'Cache-Control': 'no-cache'
    })
    const query = req.query.webhook
      ? req.query
      : {
        webhook: process.env.STATIC_WEBHOOK || ''
      }
    const data = {
      version: pack.version,
      title: pack.name,
      server: RINGCENTRAL_APP_SERVER,
      cdn: CDN || RINGCENTRAL_APP_SERVER,
      home: APP_HOME,
      query: query
    }
    data._global = copy(data)
    res.render(view, data)
  }
}
