import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Layout, Space, Tooltip } from "antd";
import Head from "next/head";
import { User } from "../lib/types";
import InfoModal from "../components/InfoModal";
import UserFormModal from "../components/UserFormModal";
import GasCard from "../components/GasCard";
import UsersList from "../components/UsersList";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const INITIAL_USER = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  updatedAt: ""
}

const Home = () => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { data: users, error: userError } = useSWR("/api/user", fetcher);

  useEffect(() => {
    setIsInfoModalOpen(true);
  }, [])

  const userHandleClick = (user: User) => {
    setUser(user);
    mutate(`/api/user/${user._id}`);
  }

  return (
    <>
      <Head>
        <title>Auto Amigo Mongo</title>
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header style={{ color: "#ffffff", fontWeight: "bold" }}>Auto Amigo Mongo</Layout.Header>
        <Layout.Content style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <InfoModal 
            isModalOpen={isInfoModalOpen} 
            setModalStatus={setIsInfoModalOpen} 
          />
          <UserFormModal 
            isModalOpen={isUserModalOpen} 
            setModalStatus={setIsUserModalOpen} 
          />
          
          <Space direction="vertical" size="middle" style={{ width: "70%" }}>
            <Card>
              <Space direction="vertical" size="middle"  style={{ display: "flex" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h1>Users</h1>
                  <Tooltip title="Create a new user">
                    <Button 
                      type="primary" 
                      onClick={() => setIsUserModalOpen(true)}
                    >
                      Create User
                    </Button>
                  </Tooltip>
                </div>
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
        <Layout.Footer 
          style={{ 
            padding: "20px", 
            color: "#ffffff", 
            backgroundColor: "#001529" 
          }}
        >
          Made by <a href="https://github.com/Zhusufeng">Lisa</a>
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default Home;
