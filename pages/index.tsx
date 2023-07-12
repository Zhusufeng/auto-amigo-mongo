import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from 'react';
import { Button, Card, Layout, Space, Tooltip } from 'antd';
import { User } from '../lib/types';
import UserFormModal from "../components/UserFormModal";
import GasCard from "../components/GasCard";
import UsersList from "../components/UsersList";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

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

  const { data: users, error: userError } = useSWR("/api/user", fetcher);

  const userHandleClick = (user: User) => {
    setUser(user);
    mutate(`/api/user/${user._id}`);
  }

  // TODO Fix white borders around Layout
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Content>
        <h1>Auto Amigo Mongo</h1>
        <UserFormModal 
          isModalOpen={isUserModalOpen} 
          setModalStatus={setIsUserModalOpen} 
        />
        
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
              <UsersList 
                user={user} 
                users={users} 
                userHandleClick={userHandleClick} 
              />
            </Space>
          </Card>
          {user._id ? <GasCard user={user} /> : null}
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
