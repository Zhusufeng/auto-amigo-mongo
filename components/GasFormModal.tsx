import axios, { AxiosError } from 'axios';
import { useState } from "react";
import { mutate } from "swr";
import { Button, Form, Input, Modal } from 'antd';

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
  previousMileage: string;
  currentMileage: string;
  gallons: string;
  pricePerGallon: string;
}) => {
  try {
    const { previousMileage, currentMileage, gallons, pricePerGallon } = values;
    const data = {
      previousMileage: parseInt(previousMileage, 10),
      currentMileage: parseInt(currentMileage, 10),
      gallons: parseInt(gallons, 10),
      pricePerGallon: parseInt(pricePerGallon, 10),
    };
    const url = `/api/gas/${userId}`;
    await axios({
      method: 'post',
      url,
      data
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
        <Form.Item
          label="Previous Mileage"
          name="previousMileage"
          rules={[{ required: true, message: 'Please input your previous mileage!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Current Mileage"
          name="currentMileage"
          rules={[{ required: true, message: 'Please input your current mileage!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="gallons"
          name="gallons"
          rules={[{ required: true, message: 'Please input your gallons!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price Per Gallon"
          name="pricePerGallon"
          rules={[{ required: true, message: 'Please input your price per gallon!' }]}
        >
          <Input />
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