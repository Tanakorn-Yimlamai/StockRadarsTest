import React from 'react';
import { Button, Form, Input,InputNumber, Card } from 'antd';
import "./App.css";

function App() {
  const myKeysValues = window.location.search;
  const urlParams = new URLSearchParams(myKeysValues);
  const ref = urlParams.get('ref');
  const email = urlParams.get('email');
//to test you can just put in the url field: localhost:3000?ref=stockradars&email=example@siamsquared.com

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  const validateMessages = {
    required: 'โปรดใส่ข้อมูลของท่าน!',
    types: {
      email: '${label} ไม่ถูกต้อง!',
      number: '${label} ต้องเป็นตัวเลขเท่านั้น!',
    },
    number: {
      max: '${label} must be maximum ${max}',
    },
  };
  
  const onFinish = (values) => {
    console.log(values);
  };
  
  return (
    <div className='App'>
      <Card title="ฟอร์มลงทะเบียน" style={{ width: 550,   boxShadow: '0 1px 15px rgba(0, 0, 0, 0.5)'}}>
        <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 1000,
        }}
        validateMessages={validateMessages}
        initialValues={{
          remember: true,
          email: email,
          ref: ref
      }}

      >
        <Form.Item
          name={['name', 'firstname']}
          label="ชื่อ"
          style={{
            width: 500,
          }}
          rules={[
            {
            required: true
          }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['name', 'lastname']}
          label="นามสกุล"
          rules={[
            {
            required: true
          }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email' 
          label="อีเมล"
          value= "sadas"
          rules={[
            {
              type: 'email',
              required: true
            },
          ]}
        >
          <Input  />
        </Form.Item>
        <Form.Item 
        name={['phone']} 
        label="เบอร์โทรศัพท์"
        rules={[
          {
            type: 'number'
          },
        ]}
        
        >
          <InputNumber className='phonebox'/>
        </Form.Item>
        <Form.Item name={['ref']} label="Ref">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default App;
