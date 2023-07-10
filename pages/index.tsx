import axios from "axios";
import useSWR from "swr";
import { useState} from 'react';
import GasForm from "../components/GasForm";
import UserForm from "../components/UserForm";
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
  const gasForm = {
    previousMileage: "",
    currentMileage: "",
    gallons: "",
    pricePerGallon: "",
  };
  const userForm = {
    firstName: '',
    lastName: '', 
    email: ''
  }

  const { data: gasData, error: gasError } = useSWR(`/api/user/${userId}`, fetcher);
  const { data: userData, error: userError } = useSWR("/api/user", fetcher);
  console.log("gasData", gasData);

  const userHandleClick = (id: string) => {
    setUserId(id)
  }

  return (
    <div>
      <h1>Auto Amigo Mongo</h1>
      <h2>Create User</h2>
      <UserForm userForm={userForm} />
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
      <h2>Add New Gas Entry</h2>
      <GasForm gasForm={gasForm} userId={userId} />
      <h2>Gas History</h2>
      <GasTable tableData={gasData?.data?.gasEntries} />
    </div>
  );
};

export default Table;
