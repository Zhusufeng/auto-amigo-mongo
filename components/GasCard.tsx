import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { Button, Card, Space, Tooltip } from "antd";
import { User } from "../lib/types";
import GasFormModal from "../components/GasFormModal";
import GasTable from "../components/GasTable";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

type Props = {
  user: User;
};

const GasCard = ({ user }: Props) => {
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);

  const { data: gasData = [], error: gasError } = useSWR(
    `/api/user/${user._id}`,
    fetcher
  );

  return (
    <>
      <GasFormModal
        isModalOpen={isGasModalOpen}
        setModalStatus={setIsGasModalOpen}
        userId={user._id}
      />
      <Card>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{`${user.firstName} ${user.lastName}'s Gas History`}</h1>
            <Tooltip
              title={`Add a new gas entry for user, ${user.firstName} ${user.lastName}`}
            >
              <Button type="primary" onClick={() => setIsGasModalOpen(true)}>
                Add Gas Entry
              </Button>
            </Tooltip>
          </div>
          <GasTable tableData={gasData?.data?.gasEntries} />
        </Space>
      </Card>
    </>
  );
};

export default GasCard;
