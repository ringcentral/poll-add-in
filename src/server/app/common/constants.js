import { resolve } from 'path'
import copy from 'json-deep-copy'

const { RINGCENTRAL_APP_SERVER, CDN, SERVER_HOME, SERVICE_NAME } = process.env
const arr = RINGCENTRAL_APP_SERVER.split('/')
const root = arr[0] + arr[1] + arr[2]
const cwd = process.cwd()

export const extraPath = RINGCENTRAL_APP_SERVER.replace(root, '')
export const pack = require(resolve(cwd, 'package.json'))

const base = {
  version: pack.version,
  title: pack.name,
  home: SERVER_HOME,
  server: RINGCENTRAL_APP_SERVER,
  cdn: CDN || RINGCENTRAL_APP_SERVER,
  serviceName: SERVICE_NAME
}
base._global = copy(base)

export const data = base
