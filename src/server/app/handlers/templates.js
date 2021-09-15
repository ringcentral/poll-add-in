
import { voteTemp } from '../templates/vote'
import { messageTemp } from '../templates/message'

import temp from 'handlebars'

export const messageTempRender = temp.compile(messageTemp, { noEscape: true })
export const voteTempRender = temp.compile(voteTemp, { noEscape: true })
