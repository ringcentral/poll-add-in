
import { Component } from 'react'
import { Spin } from 'antd'
import VoteForm from './form'
import Detail from './card'
import fetch from '../../lib/fetch'
import {
  RingCentralNotificationIntegrationHelper
} from 'ringcentral-notification-integration-helper'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      id: this.getWebhookId(),
      webhook: window.rc.query.webhook,
      initialValues: {
        title: 'Which color you like more?',
        desc: 'a test poll',
        multi: false,
        options: [
          {
            title: 'red'
          },
          {
            title: 'blue'
          }
        ]
      }
    }
  }

  app = new RingCentralNotificationIntegrationHelper()

  componentDidMount () {
    this.getData()
  }

  getWebhookId = () => {
    const { webhook = '' } = window.rc.query
    const arr = webhook.split('/')
    const len = arr.length
    return len ? arr[len - 1] : ''
  }

  getData = async () => {
    this.setState({
      loading: true
    })
    const r = await fetch.get(
      window.rc.server + '/data?id=' + this.state.id
    )
    const update = {
      loading: false
    }
    if (r) {
      update.initialValues = r
    }
    this.setState(update)
  }

  submit = async (res) => {
    this.setState({
      loading: true
    })
    const r = await fetch.post(
      window.rc.server + '/create',
      {
        ...res,
        id: this.state.id,
        webhook: this.state.webhook
      }
    )
    const update = {
      loading: false
    }
    if (r) {
      update.initialValues = r
    }
    this.setState(update)
    window.postMessage({
      type: 'rc-submit',
      result: r
    }, '*')
  }

  buildProps = () => {
    return {
      initialValues: this.state.initialValues,
      handleSubmit: this.submit,
      app: this.app
    }
  }

  renderDetail () {
    return (
      <Detail item={this.state.item || {}} />
    )
  }

  render () {
    const { id } = this.state.initialValues || {}
    if (id) {
      return this.renderDetail()
    }
    const props = this.buildProps()
    return (
      <div className='wrap'>
        <Spin spinning={this.state.loading}>
          <VoteForm {...props} />
        </Spin>
      </div>
    )
  }
}
