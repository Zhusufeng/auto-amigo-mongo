import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from 'react';
import { Button, Card, Layout, Space, Tag, Tooltip } from 'antd';
import GasFormModal from "../components/GasFormModal";
import UserFormModal from "../components/UserFormModal";
import GasTable from "../components/GasTable";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

const INITIAL_USER = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  createdAt: '',
  updatedAt: ''
}

const Home = () => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);

  const { data: users, error: userError } = useSWR("/api/user", fetcher);
  const { data: gasData = [], error: gasError } = useSWR(`/api/user/${user._id}`, fetcher);

  const userHandleClick = (user: User) => {
    setUser(user);
    mutate(`/api/user/${user._id}`);
  }

  // TODO Fix white borders around Layout
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Content>
        <UserFormModal 
          isModalOpen={isUserModalOpen} 
          setModalStatus={setIsUserModalOpen} 
        />
        <GasFormModal 
          isModalOpen={isGasModalOpen} 
          setModalStatus={setIsGasModalOpen} 
          userId={user._id} 
        />
        <h1>Auto Amigo Mongo</h1>

        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="Users" style={{ maxWidth: '600px' }}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Create a new user">
                  <Button 
                    type="primary" 
                    onClick={() => setIsUserModalOpen(true)}
                  >
                    Create User
                  </Button>
                </Tooltip>
              </div>
              <p>Select a user to view their gas log or to add to their gas log.</p>
              <div>
                {users?.data.map((u: User) => {
                    const userString = `${u.firstName} ${u.lastName}`
                    return (
                      <Tooltip 
                        key={u._id as string} 
                        title={u.email}
                      >
                        <Tag 
                          color={user._id === u._id ? "blue" : "lightgray"}
                          onClick={() => userHandleClick(u)}
                        >
                          {userString}
                        </Tag>
                      </Tooltip>
                    );
                  })}
                </div>
              </Space>
          </Card>
          {user._id 
            ? 
              (
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
              )
            :
              null
          }
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
