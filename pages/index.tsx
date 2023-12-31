import { Button, Card, Layout, Space, Tooltip } from "antd";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import GasCard from "../components/GasCard";
import Header from "../components/Header";
import UserFormModal from "../components/UserFormModal";
import UsersList from "../components/UsersList";
import { setup } from "../lib/csrf";
import { User } from "../lib/types";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const INITIAL_USER = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

const Home = () => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { data: users, error: userError } = useSWR("/api/user", fetcher);

  const userHandleClick = (user: User) => {
    setUser(user);
    mutate(`/api/user/${user._id}`);
  };

  return (
    <>
      <Head>
        <title>Auto Amigo Mongo</title>
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Layout.Content
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <UserFormModal
            isModalOpen={isUserModalOpen}
            setModalStatus={setIsUserModalOpen}
          />

          <Space direction="vertical" size="middle" style={{ width: "70%" }}>
            <Card>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
            backgroundColor: "#001529",
          }}
        >
          Made by <a href="https://github.com/Zhusufeng">Lisa</a>
        </Layout.Footer>
      </Layout>
    </>
  );
};

export const getServerSideProps = setup(async (req, res) => {
  return {
    props: {},
  };
});

export default Home;
