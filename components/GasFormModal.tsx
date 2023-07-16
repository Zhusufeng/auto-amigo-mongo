import axios, { AxiosError } from 'axios';
import { useState } from "react";
import { mutate } from "swr";
import { Button, Form, InputNumber, Modal } from 'antd';

type Props = {
  isModalOpen: boolean;
  userId: string;
  setModalStatus: (status: boolean) => void;
};

const GasFormModal = ({ isModalOpen, userId, setModalStatus }: Props) => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");

/* The POST method adds a new entry in the mongodb database. */
const onFinish = async (values: {
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
}) => {
  try {
    const url = `/api/gas/${userId}`;
    await axios({
      method: 'post',
      url,
      data: values
    });
    mutate(`/api/user/${userId}`);
    closeModal();
  } catch (error) {
    let message = "Failed to add gas entry.";
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
}

  return (
    <Modal 
      open={isModalOpen}
      footer={null}
      closable={false}
    >
      <p style={{ color: 'red' }}>{message}</p>
      <Form
        form={form}
        name="gas-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <h2>Add Gas Entry</h2>
        <Form.Item
          label="Previous Mileage"
          name="previousMileage"
          rules={[{ required: true, message: 'Please input your previous mileage!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Current Mileage"
          name="currentMileage"
          rules={[{ required: true, message: 'Please input your current mileage!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Gallons"
          name="gallons"
          rules={[{ required: true, message: 'Please input your gallons!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Price Per Gallon"
          name="pricePerGallon"
          rules={[{ required: true, message: 'Please input your price per gallon!' }]}
        >
          <InputNumber />
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
  )
};

export default GasFormModal;