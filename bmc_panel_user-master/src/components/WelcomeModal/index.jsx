import React, { useState } from 'react';
import { Button, Modal } from 'antd';

export default function WelcomeModal({title, children, action}){
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
        onCancel={handleOk}
        maskClosable={false}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok!
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </div>
  )
}