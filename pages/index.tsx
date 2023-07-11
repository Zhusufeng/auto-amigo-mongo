import useSWR from "swr";
import axios from "axios";
import { useState} from 'react';
import { Button } from 'antd';
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

const Table = () => {
  const [userId, setUserId] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isGasModalOpen, setIsGasModalOpen] = useState(false);

  const { data: gasData, error: gasError } = useSWR(`/api/user/${userId}`, fetcher);
  const { data: userData, error: userError } = useSWR("/api/user", fetcher);

  const userHandleClick = (id: string) => {
    setUserId(id)
  }

  return (
    <div>
      <UserFormModal 
        isModalOpen={isUserModalOpen} 
        setModalStatus={setIsUserModalOpen} 
      />
      <GasFormModal 
        isModalOpen={isGasModalOpen} 
        setModalStatus={setIsGasModalOpen} 
        userId={userId} 
      />
      <h1>Auto Amigo Mongo</h1>
      <Button type="primary" onClick={() => setIsUserModalOpen(true)}>Create User</Button>

      <h2>Users</h2>
      <div>
        <ul>
        {userData?.data.map((user: User) => {
            const userString = `${user.firstName} ${user.lastName} (${user.email})`
            return (
              <li 
                style={{ color: userId === user._id ? 'blue' : 'black'}} 
                key={user._id as string} 
                onClick={() => userHandleClick(user._id)}
              >
                {userString}
              </li>
            );
          })}
        </ul>
      </div>
      <Button type="primary" onClick={() => setIsGasModalOpen(true)}>Add Gas Entry</Button>

      <h2>Gas History</h2>
      <GasTable tableData={gasData?.data?.gasEntries} />
    </div>
  );
};

export default Table;
