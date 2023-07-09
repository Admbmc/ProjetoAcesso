import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import FormCreateProfileCompany from '../FormCreateProfileCompany'

export default function CreateProfile({title, children, action}){
  const [ visible, setVisible ] = useState(true);

  const handleOk = () => {
    setVisible(false);
  };

  return(
    <div>
      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={false}
        maskClosable={false}
        footer={false}
      >
        <FormCreateProfileCompany />
      </Modal>
    </div>
  )
}