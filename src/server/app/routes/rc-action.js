
import { Record } from '../models/record'
import { Webhook } from '../models/webhook'
import { messageTempRender } from '../handlers/templates'
import copy from 'json-deep-copy'
// import _ from 'lodash'
// import { nanoid as generate } from 'nanoid'
import { postMessage } from '../handlers/webhook'
import parser from '../handlers/string-parser'

function createMsg (txt) {
  const msg = messageTempRender({
    title: txt
  })
  const r = {
    attachments: [
      JSON.parse(msg)
    ]
  }
  return r
}

function getId (user) {
  const {
    id,
    accountId
  } = user
  return `${accountId}-${id}`
}

function expired (inst) {
  const now = Date.now()
  return inst.expire && now > inst.expire
}

function buildVoteResult (options, inst) {
  const all = options.reduce((p, opt) => {
    return p + opt.count
  }, 0)
  const opts = options.map((opt, i) => {
    const percent = Math.floor(opt.count * 100 / all)
    return `${i + 1}: ${opt.title} (${opt.count}, ${percent}%)`
  }).join('\n')
  const str = `**${inst.title}**\n${opts}`
  return createMsg(parser(str))
}

async function action (req, res) {
  console.log('==========')
  console.log(req.body)
  console.log('==========')
  const {
    user,
    data
  } = req.body
  if (!user || !data) {
    res.status(400).send('not ok')
    return false
  }
  const { firstName = 'User' } = user
  const rcId = getId(user)
  const {
    whId,
    voteId
  } = data
  const inst = await Webhook.findByPk(whId)
  if (!inst) {
    return res.status(200).send('not exist')
  }
  const { webhook } = inst
  if (expired(inst)) {
    const msg = createMsg(
      `${firstName}, Poll already ended`
    )
    await postMessage(webhook, msg)
    return res.status(200).send('expired')
  }
  const recId = `${whId}#${rcId}`
  const record = await Record.findByPk(recId)
  if (record) {
    const msg = createMsg(
      `${firstName}, You already voted, can not change result`
    )
    await postMessage(webhook, msg)
    return res.send('ok')
  }
  const voteIds = voteId.split(',')
  const options = copy(inst.options).map(opt => {
    const count = voteIds.includes(opt.id)
      ? (opt.count || 0) + 1
      : 0
    return {
      ...opt,
      count
    }
  })
  await Webhook.update({
    options
  }, {
    where: {
      id: inst.id
    }
  })
  await Record.create({
    id: recId,
    data: req.body
  })
  await postMessage(webhook, createMsg(
    `${firstName} voted`
  ))
  await postMessage(webhook, buildVoteResult(options, inst))
  res.send('ok')
}

export default (app) => {
  app.post('/rc/action', action)
}
