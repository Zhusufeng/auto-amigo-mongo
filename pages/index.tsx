import axios from "axios";
import useSWR from "swr";
import { useState} from 'react';
import GasForm from "../components/GasForm";
import UserForm from "../components/UserForm";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

type Log = {
  _id: string;
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
  createdAt: string;
  updatedAt: string;
};

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
/**
 * Create API to create user
 * Use API to create users
 * On the UI, list all users
 * A user may be selected (clicked on)
 * It should show all the gas logs for that user only
 * and the form adds a new entry, which belongs to that user
 */

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
              <li key={user._id as string} onClick={() => userHandleClick(user._id)}>
                {userString}
              </li>
            );
          })}
        </ul>
      </div>
      <h2>Add New Gas Entry</h2>
      <GasForm gasForm={gasForm} />
      <h2>Gas History</h2>
      <table>
        <thead>
          <tr>
            <td>Previous Mileage</td>
            <td>Current Mileage</td>
            <td>Gallons</td>
            <td>Price Per Gallon</td>
          </tr>
        </thead>
        <tbody>
          {gasData?.data?.gasEntries ? gasData.data.gasEntries.map((log: Log) => {
            return (
              <tr key={log._id as any}>
                <td>{log.previousMileage.toString()}</td>
                <td>{log.currentMileage.toString()}</td>
                <td>{log.gallons.toString()}</td>
                <td>{log.pricePerGallon.toString()}</td>
              </tr>
            );
          }) : null}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default Table;
