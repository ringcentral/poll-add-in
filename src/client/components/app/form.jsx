
import { Form, Input, Button, Switch } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
const { Item, List } = Form
const inIframe = window.top !== window

export default function FormVote (props) {
  const [form] = Form.useForm()
  function renderItem (field, i, add, remove) {
    const after = i > 1
      ? (
        <MinusCircleOutlined
          className='pointer'
          onClick={() => remove(field.name)}
        />
      )
      : null
    return (
      <Item
        {...field}
        name={[field.name, 'title']}
        fieldKey={[field.fieldKey, 'title']}
        rules={[
          {
            required: true,
            message: 'choice title required'
          }, {
            max: 130,
            message: '130 chars max'
          }
        ]}
      >
        <Input
          addonBefore={`${i + 1}.`}
          placeholder='Choice title'
          addonAfter={after}
        />
      </Item>
    )
  }
  async function onValuesChange (changedValues, allValues) {
    console.log(changedValues, allValues)
    const r = await form.validateFields()
      .catch(err => {
        if (err && err.errorFields && !err.errorFields.length) {
          return true
        }
      })
    console.log('r', r)
    props.app.send({
      canSubmit: !!r // or false if can not submit
    })
  }
  function doSubmit () {
    return new Promise((resolve) => {
      window.rc.onReturn = (e) => {
        if (e && e.data && e.data.type === 'rc-submit') {
          window.removeEventListener('message', window.rc.onReturn)
          resolve(e.data.result)
        }
      }
      window.addEventListener('message', window.rc.onReturn)
      form.submit()
    })
  }
  useEffect(() => {
    props.app.on('submit', async (e) => {
      console.log(e.data.payload)
      // do something like submit
      const submitSuccess = await doSubmit()
      return {
        status: !!submitSuccess
        // true means submit success, RingCentral app will close integration window
      }
    })
  }, [])
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={props.handleSubmit}
      onValuesChange={onValuesChange}
      initialValues={props.initialValues}
    >
      <Item
        name='title'
        label='Title'
        rules={[
          {
            required: true,
            message: 'Required'
          },
          {
            max: 500
          }
        ]}
      >
        <Input />
      </Item>
      <Item
        name='desc'
        label='Description'
        rules={[
          {
            max: 1500
          }
        ]}
      >
        <Input.TextArea rows={2} />
      </Item>
      <Item
        noStyle
      >
        <div>Choices</div>
      </Item>
      <List
        name='options'
      >
        {
          (fields, { add, remove }, { errors }) => {
            return (
              <div>
                {
                  fields.map((field, i) => {
                    return renderItem(field, i, add, remove)
                  })
                }
                <Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    New Option
                  </Button>
                </Item>
              </div>
            )
          }
        }
      </List>
      <Item
        name='multi'
        label='Multiple select'
        valuePropName='checked'
      >
        <Switch />
      </Item>
      {
        inIframe
          ? null
          : (
            <Item
              noStyle
            >
              <Button
                htmlType='submit'
                type='primary'
              >
                Submit
              </Button>
            </Item>
          )
      }
    </Form>
  )
}
