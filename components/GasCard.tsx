import useSWR from "swr";
import axios from "axios";
import { useState } from 'react';
import { Button, Card, Space, Tooltip } from 'antd';
import GasFormModal from "../components/GasFormModal";
import GasTable from "../components/GasTable";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

type Props = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
};

const GasCard = ({ user }: Props) => {
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);

  const { data: gasData = [], error: gasError } = useSWR(`/api/user/${user._id}`, fetcher);

  return (
    <>
      <GasFormModal 
        isModalOpen={isGasModalOpen} 
        setModalStatus={setIsGasModalOpen} 
        userId={user._id} 
      />
      <Card title={`${user.firstName} ${user.lastName}'s Gas History`} style={{ maxWidth: '600px' }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={`Add a new gas entry for user, ${user.firstName} ${user.lastName}`}>
              <Button type="primary" onClick={() => setIsGasModalOpen(true)}>Add Gas Entry</Button>
            </Tooltip>
          </div>
          <GasTable tableData={gasData?.data?.gasEntries} />
        </Space>
      </Card>
    </>
  );
};

export default GasCard;
