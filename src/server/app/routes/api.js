/**
 * bot control apis
 * /api
 */

import { Webhook } from '../models/webhook'
import { voteTempRender } from '../handlers/templates'
// import copy from 'json-deep-copy'
import { postMessage } from '../handlers/webhook'
import parser from '../handlers/string-parser'

function build (body) {
  const bd = body
  bd.multi = !!body.multi
  const len = bd.options.length
  bd.options = body.options.map((opt, i) => {
    return {
      title: parser(opt.title),
      id: opt.id,
      sep: i < len - 1 ? ',' : ''
    }
  })
  return bd
}

function validate (body) {
  const bd = body
  bd.multi = body.multi ? 1 : 0
  bd.options = body.options.map((opt, i) => {
    return {
      title: parser(opt.title),
      id: 'v' + (i + 1)
    }
  })
  return bd
}

async function data (req, res) {
  const { id } = req.query
  if (!id) {
    return res.status(404).send('id required')
  }
  const inst = await Webhook.findByPk(id)
  if (!inst) {
    return res.status(404).send('404')
  }
  res.send(inst)
}

async function create (req, res) {
  const data = validate(req.body)
  if (data.error) {
    return res.status(data.status || 400).send(data.error)
  }
  const inst = await Webhook.create(data)
  const tempData = {
    ...build(data),
    data: parser({
      whId: inst.id
    })
  }
  console.log(tempData)
  const tempStr = voteTempRender(tempData)
  console.log(tempStr)
  const r = {
    attachments: [
      JSON.parse(tempStr)
    ]
  }
  await postMessage(inst.webhook, r)
  res.send(inst)
}

async function del (req, res) {
  const {
    id
  } = req.body
  const r = await Webhook.destroy({
    where: {
      id
    }
  })
  res.send(r)
}

export default (app) => {
  app.get('/data', data)
  app.post('/create', create)
  app.post('/del', del)
}
