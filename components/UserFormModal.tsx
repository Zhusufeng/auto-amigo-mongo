import { useState } from "react";
import { mutate } from "swr";
import { Button, Form, Input, Modal } from 'antd';

type Props = {
  isModalOpen: boolean;
};

const UserFormModal = ({ isModalOpen }: Props) => {
  const contentType = "application/json";
  const [message, setMessage] = useState("");

  /* The POST method adds a new entry in the mongodb database. */
  const onFinish = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(values),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }
      mutate("/api/user");
    } catch (error) {
      setMessage("Failed to add user");
    }
  };

  return (
    <Modal open={isModalOpen}>
      <p>{message}</p>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  )
};

export default UserFormModal;