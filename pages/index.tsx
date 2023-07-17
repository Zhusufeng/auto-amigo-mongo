import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from "react";
import { Button, Card, Layout, Space, Tooltip } from "antd";
import Head from "next/head";
import { User } from "../lib/types";
import { MAX_USERS, MAX_GAS_ENTRIES } from "../lib/constants";
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
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const { data: users, error: userError } = useSWR("/api/user", fetcher);

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
          <UserFormModal 
            isModalOpen={isUserModalOpen} 
            setModalStatus={setIsUserModalOpen} 
          />
          
          <Space direction="vertical" size="middle" style={{ width: "70%" }}>
            <Card>
              <h1>Background</h1>
              <p>
                This is a mini version of Auto Amigo. 
                I made this to brush up on MongoDB, use Next.js&apos; pages API (serverless), 
                and deploy on Vercel. 
                It mimics Auto Amigo in the way that there can be multiple users, and their gas usage
                and spending can be saved to the web app.
              </p>
              <h1>Instructions</h1>
              <p>
                Since this is a mini version, only {MAX_USERS} users can be created.
                Each user can only have up to {MAX_GAS_ENTRIES} gas log entries. 
                Everyone can view the users&apos; gas logs.
                If there are no users, create a user.
                Created users will show under &quot;Users&quot;. 
                Select a user to view their gas log or to add to their gas log.
              </p>
            </Card>
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
