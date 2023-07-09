import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React from "react";

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: "Do you Want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    content: "Some descriptions",

    onOk() {},

    onCancel() {},
  });
};
