import axios, { AxiosError } from "axios";
import { useState } from "react";
import { mutate } from "swr";
import { Button, Form, Input, Modal } from "antd";
import { TEXT_LENGTH } from "../lib/constants";

type Props = {
  isModalOpen: boolean;
  setModalStatus: (status: boolean) => void;
};

const UserFormModal = ({ isModalOpen, setModalStatus }: Props) => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");

  /* The POST method adds a new entry in the mongodb database. */
  const onFinish = async (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      await axios({
        method: "post",
        url: "/api/user",
        data: values,
      });

      mutate("/api/user");
      closeModal();
    } catch (error: unknown) {
      let message = "Failed to add user.";
      if (error instanceof AxiosError) {
        if (error?.response?.data?.errorMessage) {
          message = `${error.response.data.errorMessage} ${message}`;
        }
      }
      setMessage(message);
    }
  };

  const closeModal = () => {
    form.resetFields();
    setMessage("");
    setModalStatus(false);
  };

  return (
    <Modal open={isModalOpen} footer={null} closable={false}>
      <p style={{ color: "red" }}>{message}</p>
      <Form
        form={form}
        name="user-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <h2>Add User</h2>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input showCount maxLength={TEXT_LENGTH} />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input showCount maxLength={TEXT_LENGTH} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input showCount maxLength={TEXT_LENGTH} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>{" "}
          <Button type="default" onClick={closeModal}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
